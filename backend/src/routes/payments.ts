import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

import { env } from '../config/env.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/order', requireAuth, async (req, res) => {
  const amount = Number(req.body.amount || 1000);

  if (!env.razorpayKeyId || !env.razorpayKeySecret) {
    return res.json({
      mock: true,
      orderId: `mock_${crypto.randomUUID()}`,
      amount,
      currency: 'INR',
      message: 'Razorpay keys not configured. Returning mock order for local MVP.',
    });
  }

  const razorpay = new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret });
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: `sethu_${Date.now()}`,
    notes: {
      purpose: 'temp_staffing_booking',
      requestedBy: req.auth?.email ?? 'unknown',
    },
  });

  res.json(order);
});

export default router;
