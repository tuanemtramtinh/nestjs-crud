import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant';
import { TokenPayload } from 'src/shared/types/jwt.type';

export const ActiveUser = createParamDecorator(
  (field: keyof TokenPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user: TokenPayload = request[REQUEST_USER_KEY] as TokenPayload;
    return field ? user[field] : user;
  },
);
