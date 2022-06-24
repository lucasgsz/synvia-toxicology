import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { hashConfig } from 'src/config/hash.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPassword } from './entities/user-without-password.entity';
import { User } from './entities/user.entity';
import { InvalidPasswordUpdateException } from './exceptions/invalid-password-update.exception';
import { MissingPasswordUpdateException } from './exceptions/missing-password-update.exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const hashedPassword = await hash(
      createUserDto.password,
      hashConfig.saltRounds,
    );

    const lowerCaseEmail = createUserDto.email.toLowerCase();

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        email: lowerCaseEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
  }

  async findById(id: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    delete user.password;

    return { ...user };
  }

  async findByEmail(email: string): Promise<User> {
    const lowerCaseEmail = email.toLowerCase();

    return this.prisma.user.findUnique({ where: { email: lowerCaseEmail } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    await this.hashIfUpdatingPassword(id, updateUserDto);

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, updatedAt: new Date() },
    });

    delete user.password;

    return { ...user };
  }

  async remove(id: string, deleteUserDto: DeleteUserDto): Promise<void> {
    await this.validateCurrentPassword(id, deleteUserDto.currentPassword);

    await this.prisma.user.delete({ where: { id } });
  }

  private async hashIfUpdatingPassword(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    if (updateUserDto.password && updateUserDto.currentPassword) {
      await this.validateCurrentPassword(id, updateUserDto.currentPassword);

      const hashedPassword = await hash(
        updateUserDto.password,
        hashConfig.saltRounds,
      );

      updateUserDto.password = hashedPassword;
      delete updateUserDto.currentPassword;

      return;
    }

    if (updateUserDto.password || updateUserDto.currentPassword) {
      throw new MissingPasswordUpdateException();
    }
  }

  private async validateCurrentPassword(
    id: string,
    currentPassword: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const isCorrectPassword = await compare(currentPassword, user.password);

    if (!isCorrectPassword) {
      throw new InvalidPasswordUpdateException();
    }
  }
}
