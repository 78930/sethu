import { Router } from 'express';
import { z } from 'zod';

import { requireAuth, requireRole } from '../middleware/auth.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { User } from '../models/User.js';
import { scoreWorkerForJob } from '../utils/match.js';

const router = Router();

router.get('/', async (req, res) => {
  const { area, role, shift, q } = req.query;
  const query: Record<string, unknown> = { status: 'Open' };

  if (area) query.area = String(area);
  if (shift) query.shift = String(shift);
  if (role) query.$or = [{ title: String(role) }, { preferredRoles: String(role) }];
  if (q) query.$text = { $search: String(q) };

  const jobs = await Job.find(query).sort({ createdAt: -1 }).lean();
  res.json(jobs.map((job) => ({ ...job, _id: String(job._id) })));
});

router.get('/recommended/me', requireAuth, requireRole(['worker']), async (req, res) => {
  const worker = await User.findById(req.auth?.userId);
  if (!worker) return res.status(404).json({ message: 'Worker not found' });

  const jobs = await Job.find({ status: 'Open' }).sort({ createdAt: -1 });
  const ranked = jobs
    .map((job) => {
      const { fitScore, distanceKm } = scoreWorkerForJob(worker, job);
      return {
        ...job.toObject(),
        fitScore,
        distanceKm,
        _id: String(job._id),
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore);

  res.json(ranked);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id).lean();
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ ...job, _id: String(job._id) });
});

router.post('/', requireAuth, requireRole(['factory', 'admin']), async (req, res) => {
  const schema = z.object({
    title: z.string().min(2),
    companyName: z.string().min(2),
    area: z.string().min(2),
    areas: z.array(z.string()).optional(),
    reqSkills: z.array(z.string()).default([]),
    preferredRoles: z.array(z.string()).optional(),
    shift: z.enum(['Day', 'Night', 'Rotational', 'General']),
    payMin: z.number().min(1),
    payMax: z.number().min(1),
    openings: z.number().min(1),
    description: z.string().min(10),
    location: z.object({ type: z.literal('Point'), coordinates: z.tuple([z.number(), z.number()]) }).optional(),
  });

  const payload = schema.parse(req.body);
  const job = await Job.create({
    ...payload,
    factoryId: req.auth?.userId,
    location: payload.location ?? { type: 'Point', coordinates: [78.4867, 17.385] },
  });

  res.status(201).json(job);
});

router.post('/:id/apply', requireAuth, requireRole(['worker']), async (req, res) => {
  const worker = await User.findById(req.auth?.userId);
  const job = await Job.findById(req.params.id);
  if (!worker || !job) return res.status(404).json({ message: 'Job or worker not found' });

  const { fitScore } = scoreWorkerForJob(worker, job);
  const application = await Application.findOneAndUpdate(
    { jobId: job._id, workerId: worker._id },
    { $setOnInsert: { fitScore }, $set: { status: 'Applied' } },
    { new: true, upsert: true },
  );

  res.status(201).json(application);
});

export default router;
