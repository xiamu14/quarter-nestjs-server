import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Quarter App')
    .setDescription('The Quarter App API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3002',
      'http://localhost:3004',
      'https://quarter.vercel.app',
      'https://quarter.oneeeday.work',
    ],
  });

  await app.listen(3002);
}
bootstrap();
