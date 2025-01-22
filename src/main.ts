import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Queuetie Service')
    .setDescription('Dispatches jobs for Queuetie simulations')
    .setVersion('1.0')
    .addTag('Dispatcher', 'Everything related to dispatching jobs')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey,
  };

  const custom: SwaggerCustomOptions = {
    jsonDocumentUrl: '/openapi.json',
    yamlDocumentUrl: '/openapi.yaml',
  };

  const documentFactory = () => SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('/', app, documentFactory, custom);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: ['http://localhost:6006', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
