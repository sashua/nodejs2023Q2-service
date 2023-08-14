import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      // Foreign key constraint failed on the field
      case 'P2003': {
        const statusCode = HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
          message: 'Bad Request',
          statusCode,
        });
        break;
      }

      // An operation failed because it depends on one or more records that were required but not found
      case 'P2025': {
        const statusCode = HttpStatus.NOT_FOUND;
        response.status(statusCode).json({
          message: 'Not Found',
          statusCode,
        });
        break;
      }

      default: {
        super.catch(exception, host);
        break;
      }
    }
  }
}
