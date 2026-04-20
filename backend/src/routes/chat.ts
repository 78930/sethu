import { Router } from 'express';

import { requireAuth } from '../middleware/auth.js';
import { Message } from '../models/Message.js';

const router = Router();

router.get('/:peerId', requireAuth, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { from: req.auth?.userId, to: req.params.peerId },
      { from: req.params.peerId, to: req.auth?.userId },
    ],
  }).sort({ createdAt: 1 });
  res.json(messages.map((message) => ({ ...message.toObject(), _id: String(message._id) })));
});

router.post('/:peerId', requireAuth, async (req, res) => {
  const message = await Message.create({
    from: req.auth?.userId,
    to: req.params.peerId,
    body: String(req.body.body || ''),
  });
  res.status(201).json({ ...message.toObject(), _id: String(message._id) });
});

export default router;
