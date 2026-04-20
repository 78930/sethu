import http from 'http';
import { Server } from 'socket.io';

import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { Message } from './models/Message.js';

async function bootstrap() {
  await connectDb();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: env.clientUrl === '*' ? true : env.clientUrl,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const userId = String(socket.handshake.query.userId || 'guest');
    socket.join(userId);

    socket.on('send_message', async (payload: { to: string; body: string }) => {
      if (!payload?.to || !payload?.body) return;
      const message = await Message.create({ from: userId, to: payload.to, body: payload.body });
      io.to(payload.to).emit('receive_message', message);
      io.to(userId).emit('receive_message', message);
    });
  });

  server.listen(env.port, () => {
    console.log(`🚀 Sethu backend running on http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start Sethu backend', error);
  process.exit(1);
});
