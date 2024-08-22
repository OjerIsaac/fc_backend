/* eslint-disable no-console */
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ErrorHelper {
  private static readonly logger = new Logger(ErrorHelper.name);

  static BadRequestException(msg: string | string[]) {
    this.logger.error(msg);
    throw new HttpException(msg, HttpStatus.BAD_REQUEST);
  }

  static UnauthorizedException(msg: string, cause?: Error) {
    this.logger.error(msg);
    throw new HttpException(msg, HttpStatus.UNAUTHORIZED, {
      cause,
    });
  }

  static NotFoundException(msg: string) {
    this.logger.error(msg);
    throw new HttpException(msg, HttpStatus.NOT_FOUND);
  }

  static ForbiddenException(msg: string) {
    this.logger.error(msg);
    throw new HttpException(msg, HttpStatus.FORBIDDEN);
  }

  static InternalServerErrorException(msg: string) {
    this.logger.error(msg);
    throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static ConflictException(msg: string) {
    this.logger.error(msg);
    throw new HttpException(msg, HttpStatus.CONFLICT);
  }
}
