import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 제거
      transform: true, // 요청 데이터를 DTO 클래스의 인스턴스로 변환
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 막음
      transformOptions: {
        enableImplicitConversion: true, // 암시적 변환 활성화
      },
    }),
  );

  await app.listen(process.env.PORT ?? 8000);

  console.log(`Server is running on port ${process.env.PORT ?? 8000}`);
}

bootstrap();
