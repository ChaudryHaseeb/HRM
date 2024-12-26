import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const db = mongoose.connection;
  db.on('connected', () => console.log('✅ MongoDB connected successfully'));
  db.on('error', (err) => console.error('❌ MongoDB connection error:', err));
  db.on('disconnected', () => console.log('❌ MongoDB disconnected'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
