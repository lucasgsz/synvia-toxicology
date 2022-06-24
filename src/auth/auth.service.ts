import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { accessJwtConfig } from 'src/config/jwt.config';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { LoginResponse } from './dto/login.response';
import { InvalidEmailOrPasswordException } from './exceptions/invalid-email-or-password.exception.';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, userRole: user.role };

    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }

    throw new InvalidEmailOrPasswordException();
  }

  private async generateAccessToken(payload: {
    sub: string;
    userRole: string;
  }): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      payload,
      accessJwtConfig,
    );

    return accessToken;
  }
}
