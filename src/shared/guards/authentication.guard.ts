import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant';
import {
  AUTH_TYPE_KEY,
  AuthTypeDecoratorPayload,
} from 'src/shared/decorators/auth.decorator';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { APIKeyGuard } from 'src/shared/guards/api-key.token.guard';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate> = {};

  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: APIKeyGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.ApiKey]: this.apiKeyGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValue =
      this.reflector.getAllAndOverride<AuthTypeDecoratorPayload>(
        AUTH_TYPE_KEY,
        [context.getHandler(), context.getClass()],
      ) ?? {
        authTypes: [AuthType.None],
        options: { condition: ConditionGuard.And },
      };

    if (!authTypeValue.options) {
      authTypeValue.options = { condition: ConditionGuard.Or };
    }

    const guards = authTypeValue.authTypes.map(
      (authType) => this.authTypeGuardMap[authType],
    );

    let error = new UnauthorizedException();

    if (authTypeValue.options.condition === ConditionGuard.Or) {
      for (const instance of guards) {
        const canActivate = await Promise.resolve(
          instance.canActivate(context),
        ).catch((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          error = err;
          return false;
        });
        if (canActivate) {
          return true;
        }
      }

      throw error;
    } else {
      for (const instance of guards) {
        const canActivate = await instance.canActivate(context);
        if (!canActivate) {
          throw new UnauthorizedException();
        }
      }
      return true;
    }
  }
}
