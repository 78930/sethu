import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    req.auth = verifyJwt(token);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(roles: Array<'worker' | 'factory' | 'admin'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.auth.userType)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
