import { Router } from 'express';
import multer from 'multer';

import { requireAuth, requireRole } from '../middleware/auth.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { User } from '../models/User.js';
import { scoreWorkerForJob } from '../utils/match.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/workers/search', requireAuth, requireRole(['factory', 'admin']), async (req, res) => {
  const { area, skill, role } = req.query;
  const query: Record<string, unknown> = { userType: 'worker' };
  if (area) query.areas = String(area);
  if (skill) query.skills = String(skill);
  if (role) query.roles = String(role);

  const workers = await User.find(query).limit(50).lean();
  res.json(workers.map((worker) => ({ ...worker, _id: String(worker._id), passwordHash: undefined })));
});

router.patch('/me', requireAuth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.auth?.userId, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const object = user.toObject() as Record<string, unknown>;
  object.passwordHash = undefined;
  res.json(object);
});

router.post('/me/location', requireAuth, async (req, res) => {
  const { coordinates } = req.body as { coordinates: [number, number] };
  const user = await User.findByIdAndUpdate(
    req.auth?.userId,
    { location: { type: 'Point', coordinates } },
    { new: true },
  );
  res.json(user);
});

router.post('/me/document', requireAuth, upload.single('document'), async (req, res) => {
  res.status(201).json({ message: 'Document uploaded', file: req.file });
});

router.get('/me/applications', requireAuth, requireRole(['worker']), async (req, res) => {
  const applications = await Application.find({ workerId: req.auth?.userId }).populate('jobId').sort({ createdAt: -1 });
  res.json(
    applications.map((app) => ({
      ...app.toObject(),
      _id: String(app._id),
      job: app.jobId,
    })),
  );
});

router.get('/me/matches', requireAuth, requireRole(['worker']), async (req, res) => {
  const worker = await User.findById(req.auth?.userId);
  if (!worker) return res.status(404).json({ message: 'Worker not found' });
  const jobs = await Job.find({ status: 'Open' });
  const matches = jobs.map((job) => ({ jobId: job._id, ...scoreWorkerForJob(worker, job) })).sort((a, b) => b.fitScore - a.fitScore);
  res.json(matches);
});

export default router;
