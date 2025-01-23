import { Test, TestingModule } from '@nestjs/testing';
import { ResponseInterceptor } from './response.interceptor';
import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('ResponseInterceptor', () => {
    let interceptor: ResponseInterceptor;
    let mockExecutionContext: Partial<ExecutionContext>;
    let mockResponse: any;
    let mockRequest: any;
  
    beforeEach(async () => {
      mockResponse = {
        statusCode: 200,
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      mockRequest = {
        url: '/test-url',
      };
  
      mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
          getResponse: () => mockResponse,
          getNext: jest.fn(),
        }),
      };
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [ResponseInterceptor],
      }).compile();
  
      interceptor = module.get<ResponseInterceptor>(ResponseInterceptor);
    });

  describe('responseHandler', () => {
    it('should format the successful response correctly', () => {
      const mockData = { name: 'Item 1' };
      const result = interceptor.responseHandler(mockData, mockExecutionContext as ExecutionContext);

      expect(result).toEqual({
        status: true,
        statusCode: 200,
        path: '/test-url',
        result: mockData,
      });
      expect(mockResponse.statusCode).toBe(200);
    });
  });

  describe('errorHandler', () => {
    it('should handle errors and format the response correctly', () => {
      const mockException = new HttpException('Error message', HttpStatus.BAD_REQUEST);
      interceptor.errorHandler(mockException, mockExecutionContext as ExecutionContext);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: false,
        statusCode: HttpStatus.BAD_REQUEST,
        path: '/test-url',
        error: 'Error message',
      });
    });

    it('should handle unexpected errors gracefully', () => {
      const mockException = new HttpException({ message: 'Unexpected error' }, HttpStatus.INTERNAL_SERVER_ERROR);
      interceptor.errorHandler(mockException, mockExecutionContext as ExecutionContext);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        path: '/test-url',
        error: 'Unexpected error',
      });
    });
  });

  describe('intercept', () => {
    it('should process the response successfully', (done) => {
      const nextHandler = {
        handle: () => of({ name: 'Item 1' }),
      };

      interceptor.intercept(mockExecutionContext as ExecutionContext, nextHandler as any).subscribe((result) => {
        expect(result).toEqual({
          status: true,
          statusCode: 200,
          path: '/test-url',
          result: { name: 'Item 1' },
        });
        done();
      });
    });

    it('should handle errors in the response', (done) => {
      const mockError = new HttpException('Error message', HttpStatus.BAD_REQUEST);
      const nextHandler = {
        handle: () => throwError(() => mockError),
      };

      interceptor.intercept(mockExecutionContext as ExecutionContext, nextHandler as any).subscribe({
        next: () => {},
        error: (error) => {
          expect(error).toBeInstanceOf(HttpException);
          expect(error.getResponse()).toEqual('Error message');
          done();
        },
      });
    });
  });
});
