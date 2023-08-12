import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { User } from 'src/db/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  create(createUserDto: CreateUserDto): User {
    return this.db.user.create({
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  findAll(): User[] {
    return this.db.user.findAll();
  }

  findOne(id: User['id']): User | null {
    return this.db.user.find(id);
  }

  updatePassword(
    id: User['id'],
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): User | false | null {
    const user = this.findOne(id);
    if (!user) return null;
    if (user.password !== oldPassword) return false;
    return this.db.user.update(id, {
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User | null {
    const user = this.db.user.find(id);
    if (!user) return null;
    return this.db.user.update(id, {
      ...updateUserDto,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
  }

  remove(id: string): User | null {
    return this.db.user.delete(id);
  }
}
