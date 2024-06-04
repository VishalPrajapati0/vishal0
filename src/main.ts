import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Video Streaming API')
    .setDescription('API for video streaming application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Nest application is running on http://localhost:${port}`);
  });
}

bootstrap();

// Load environment variables
dotenv.config();

// PostgreSQL pool configuration
const pool = new Pool({
  connectionString:  process.env.vishal0_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Adjust SSL configuration based on your PostgreSQL server setup
});

// Example usage of the pool
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('PostgreSQL connected:', res.rows[0]);
  }
});
