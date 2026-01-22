import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './services/prisma.service';
import { HashingService } from './services/hashing.service';
import { TokenService } from './services/token.service';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { APIKeyGuard } from 'src/shared/guards/api-key.token.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';

const sharedServices = [PrismaService, HashingService, TokenService];
@Global()
@Module({
  imports: [JwtModule],
  providers: [
    ...sharedServices,
    APIKeyGuard,
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  exports: sharedServices,
})
export class SharedModule {}
