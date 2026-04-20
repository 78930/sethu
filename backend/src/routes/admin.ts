import { Router } from 'express';

import { requireAuth, requireRole } from '../middleware/auth.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { User } from '../models/User.js';

const router = Router();

router.get('/stats', async (_req, res) => {
  const [totalJobs, totalWorkers, totalFactories, totalApplications, pendingVerifications, jobs] = await Promise.all([
    Job.countDocuments(),
    User.countDocuments({ userType: 'worker' }),
    User.countDocuments({ userType: 'factory' }),
    Application.countDocuments(),
    User.countDocuments({ verified: false }),
    Job.find().lean(),
  ]);

  const areaCounter = new Map<string, number>();
  const roleCounter = new Map<string, number>();
  for (const job of jobs) {
    areaCounter.set(job.area, (areaCounter.get(job.area) || 0) + 1);
    roleCounter.set(job.title, (roleCounter.get(job.title) || 0) + 1);
  }

  res.json({
    totalJobs,
    totalWorkers,
    totalFactories,
    totalApplications,
    pendingVerifications,
    areaDemand: [...areaCounter.entries()].map(([area, count]) => ({ area, count })).sort((a, b) => b.count - a.count).slice(0, 8),
    roleDemand: [...roleCounter.entries()].map(([role, count]) => ({ role, count })).sort((a, b) => b.count - a.count).slice(0, 8),
  });
});

router.patch('/verify/:userId', requireAuth, requireRole(['admin']), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { verified: true }, { new: true });
  res.json(user);
});

export default router;
