import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiResponse } from '../../../common/interfaces/api-response.interface';

@Catch(Error)
export class OAuthExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = error instanceof HttpException ? error.getStatus() : 401;
    const message =
      error instanceof HttpException
        ? error.message
        : `OAuth 인증에 실패했습니다: ${error.message}`;

    const apiResponse: ApiResponse = {
      success: false,
      error: {
        code: `OAUTH_ERR_${status}`,
        message,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    response.status(status).json(apiResponse);
  }
}
