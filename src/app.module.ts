import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AccessJwtAuthGuard } from './auth/access-jwt-auth.guard';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToxicologyModule } from './modules/toxicology-report/toxicology-report.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ToxicologyModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessJwtAuthGuard,
    },
  ],
})
export class AppModule {}
