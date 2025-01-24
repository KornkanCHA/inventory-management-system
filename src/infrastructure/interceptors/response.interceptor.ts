import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BadRequestError, NotFoundError } from 'src/domain/item/exception/custom-exception';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => {
        this.errorHandler(err, context);
        return throwError(() => err);
      }),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorDetails = exception.message;

    if (exception instanceof BadRequestError) {
        status = HttpStatus.BAD_REQUEST;
        errorDetails = exception.message;
    } else if (exception instanceof NotFoundError) {
        status = HttpStatus.NOT_FOUND;
        errorDetails = exception.message;
    } else if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        if (typeof exceptionResponse === 'string') {
            errorDetails = exceptionResponse;
        } else if (exceptionResponse && typeof exceptionResponse === 'object') {
            errorDetails = (exceptionResponse as any)?.message || 'Unknown error';
        } else {
            errorDetails = exception.message;
        }
    }

    this.logger.log(`Successfully processed request at path: ${request.url}`);

    response.status(status).json({
        status: false,
        statusCode: status,
        path: request.url,
        error: errorDetails,
    });
}

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.log(`Successfully processed request at path: ${request.url}`);

    return {
      status: true,
      statusCode: response.statusCode,
      path: request.url,
      result: res,
    };
  }
}
