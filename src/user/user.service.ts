import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  create(data: CreateUserDto): Promise<User> {
    return this.db.user.create({ data });
  }

  findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  findOne(id: User['id']): Promise<User> {
    return this.db.user.findUniqueOrThrow({ where: { id } });
  }

  async updatePassword(
    id: User['id'],
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User | null> {
    const user = await this.db.user.findUniqueOrThrow({ where: { id } });
    if (user.password !== oldPassword) return null;
    return this.db.user.update({
      where: { id },
      data: { password: newPassword, version: user.version + 1 },
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.db.user.findUniqueOrThrow({ where: { id } });
    return this.db.user.update({
      where: { id },
      data: { ...data, version: user.version + 1 },
    });
  }

  remove(id: string): Promise<User> {
    return this.db.user.delete({ where: { id } });
  }
}
