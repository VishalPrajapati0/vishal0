import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Video Streaming API')
    .setDescription('API for video streaming application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const host = '192.168.1.68';
  const port = 3000;
  await app.listen(port, host, () => {
    console.log(`Nest application is running on http://${host}:${port}`);
  });
  
}
bootstrap();
