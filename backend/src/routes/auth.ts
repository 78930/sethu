import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { z } from 'zod';

import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { signJwt } from '../utils/jwt.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  userType: z.enum(['worker', 'factory', 'admin']),
  companyName: z.string().optional(),
  roles: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  areas: z.array(z.string()).optional(),
  shiftPreference: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

router.post('/register', async (req, res) => {
  const payload = registerSchema.parse(req.body);
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    ...payload,
    email: payload.email.toLowerCase(),
    passwordHash,
    verified: payload.userType === 'admin',
  });

  const token = signJwt({ userId: user.id, userType: user.userType, email: user.email });
  res.status(201).json({ token, user: sanitize(user) });
});

router.post('/login', async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
  const { email, password } = schema.parse(req.body);
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signJwt({ userId: user.id, userType: user.userType, email: user.email });
  res.json({ token, user: sanitize(user) });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.auth?.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(sanitize(user));
});

function sanitize(user: any) {
  const object = user.toObject();
  delete object.passwordHash;
  return object;
}

export default router;
