import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.getResponse(),
    };

    const logResponse = {
      ...errorResponse,
      body: request.body,
    };

    console.error(
      `
==================== HTTP Exception ====================
`,
      JSON.stringify(logResponse, null, 2),
      `
========================================================
`,
    );

    response.status(status).json(errorResponse);
  }
}
