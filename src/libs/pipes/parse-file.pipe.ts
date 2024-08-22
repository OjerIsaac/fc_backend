import { Injectable, PipeTransform } from '@nestjs/common';
import { ErrorHelper } from '../utils';

@Injectable()
export class ParseFile implements PipeTransform {
  private readonly isOptional: boolean;

  private constructor(isOptional: boolean) {
    this.isOptional = isOptional;
  }

  static create(isOptional: boolean): ParseFile {
    return new ParseFile(isOptional);
  }

  transform(
    files: Express.Multer.File | Express.Multer.File[]
  ): Express.Multer.File | Express.Multer.File[] {
    if (!this.isOptional) {
      if (files === undefined || files === null) {
        ErrorHelper.BadRequestException('Validation failed (file expected)');
      }

      if (Array.isArray(files) && files.length === 0) {
        ErrorHelper.BadRequestException('Validation failed (files expected)');
      }
    }

    return files;
  }
}
