import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './db/exception.filter';
import { ExceptionFilter } from './exception.filter';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggingService = new LoggingService();

  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new ExceptionFilter(httpAdapter, loggingService));
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));
  app.useLogger(loggingService);
  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  process.on('uncaughtException', (error, origin) => {
    loggingService.error(`Uncaught exception: ${error}, Origin ${origin}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error(
      `Unhandled rejection at: ${promise}, Reason ${reason}`,
    );
  });

  const port = configService.get('PORT') ?? 4000;

  await app.listen(port, () =>
    loggingService.log(`Server is listening on port ${port}`),
  );
}
bootstrap();
