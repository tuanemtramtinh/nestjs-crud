import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import envConfig from 'src/shared/config';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const xAPIKey = request.headers['x-api-key'];
    if (xAPIKey === envConfig.SECRET_API_KEY) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
