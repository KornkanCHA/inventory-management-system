import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Intercepts HTTP responses and errors to standardize their structure.
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  /**
   * Intercepts the HTTP request and response.
   * @param context - The execution context containing details about the request.
   * @param next - The next handler in the request pipeline.
   * @returns An observable that emits the transformed response or an error.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => {
        this.errorHandler(err, context);
        return throwError(() => err);
      })
    );
  }

  /**
   * Handles errors and standardizes the error response format.
   * @param exception - The exception object thrown during request handling.
   * @param context - The execution context containing details about the request.
   */
  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();
    const errorDetails = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any)?.message || exception.message;

    this.logger.log(`Successfully processed request at path: ${request.url}`);

    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      error: errorDetails,
    });
  }

  /**
   * Transforms successful responses into a standardized format.
   * @param res - The original response object.
   * @param context - The execution context containing details about the request.
   * @returns A standardized response object.
   */
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
