import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type JwtPayload = {
  userId: string;
  userType: 'worker' | 'factory' | 'admin';
  email: string;
};

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}
