import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

async function bootstrap() {

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: 'http://localhost:3001', // Your Next.js frontend URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow cookies if using authentication
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

export const handler = (req: any, res: any) => {
  expressApp(req, res);
};