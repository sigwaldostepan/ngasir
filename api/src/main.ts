import { NestFactory } from '@nestjs/core';
import { AppModule } from './features/app/app.module';
import { ValidationPipe } from './common/pipes/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
