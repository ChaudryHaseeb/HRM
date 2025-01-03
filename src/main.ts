import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const jwtAuthGuard = app.get(JwtAuthGuard);
  app.useGlobalGuards(jwtAuthGuard);
  const db = mongoose.connection;
  db.on('connected', () => console.log('✅ MongoDB connected successfully'));
  db.on('error', (err) => console.error('❌ MongoDB connection error:', err));
  db.on('disconnected', () => console.log('❌ MongoDB disconnected'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
