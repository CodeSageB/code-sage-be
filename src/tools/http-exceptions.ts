import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpExceptions {
  static notFound(message = 'Not found'): HttpException {
    return new HttpException(message, HttpStatus.NOT_FOUND);
  }

  static badRequest(message = 'Bad request'): HttpException {
    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
