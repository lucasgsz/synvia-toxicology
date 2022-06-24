import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ExceptionInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Synvia Back End')
    .setDescription('Synvia Services')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('authentication')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Synvia API',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
