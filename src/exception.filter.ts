import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { LoggingService } from './logging/logging.service';

@Catch(Error)
export class ExceptionFilter extends BaseExceptionFilter {
  constructor(
    private readonly httpAdapter: AbstractHttpAdapter,
    private readonly loggingService: LoggingService,
  ) {
    super(httpAdapter);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.loggingService.error(exception.message);

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(statusCode).json({
      message: 'Internal Server Error',
      statusCode,
    });
  }
}
