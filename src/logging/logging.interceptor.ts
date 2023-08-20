import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return;

    const startTime = Date.now();
    const controllerName = context.getClass().name;
    const response = context.switchToHttp().getResponse<Response>();
    const { method, path, query, body } = context
      .switchToHttp()
      .getRequest<Request>();

    let message = `${method} ${path} (query: ${JSON.stringify(
      query,
    )}, body: ${JSON.stringify(body)})`;

    response.on('close', () => {
      const time = Math.round(Date.now() - startTime);
      const { statusCode } = response;
      message += ` => ${statusCode} (${time} ms)`;
      this.loggingService.log(message, controllerName);
    });

    return next.handle();
  }
}
