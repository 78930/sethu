import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sethu',
  jwtSecret: process.env.JWT_SECRET || 'change-me-super-secret',
  clientUrl: process.env.CLIENT_URL || '*',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};
