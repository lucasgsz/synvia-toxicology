import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessJwtStrategy } from './access-jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule, PrismaModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, AccessJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
