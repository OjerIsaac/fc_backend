import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestHeadersEnum } from '../libs/enums';
import { ErrorHelper } from '../libs/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers[RequestHeadersEnum.Authorization];

    if (!authorization) {
      ErrorHelper.UnauthorizedException('Authorization header is missing');
    }

    const user = await this.verifyAccessToken(authorization);

    req.user = user;

    return true;
  }

  async verifyAccessToken(authorization: string) {
    const [bearer, accessToken] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      ErrorHelper.UnauthorizedException('Authorization should be Bearer');
    }

    if (!accessToken) {
      ErrorHelper.UnauthorizedException('Access token is missing');
    }

    try {
      const payload = this.jwtService.verify(accessToken);

      if (!payload) {
        ErrorHelper.UnauthorizedException('Unauthorized Exception');
      }

      return payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ErrorHelper.UnauthorizedException('Token expired');
      }

      ErrorHelper.UnauthorizedException(error.message);
    }
  }
}
