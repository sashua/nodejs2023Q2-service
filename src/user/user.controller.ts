import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdParams } from './dto/user-id.params';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    const user = this.userService.create(createUserDto);
    return new UserEntity(user);
  }

  @Get()
  findAll(): UserEntity[] {
    const users = this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  findOne(@Param() { id }: UserIdParams): UserEntity {
    const user = this.userService.findOne(id);
    if (!user) throw new NotFoundException();
    return new UserEntity(user);
  }

  @Put(':id')
  updatePassword(
    @Param() { id }: UserIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    const user = this.userService.updatePassword(id, updatePasswordDto);
    if (user === null) throw new NotFoundException();
    if (user === false) throw new ForbiddenException();
    return new UserEntity(user);
  }

  @Patch(':id')
  updateUser(
    @Param() { id }: UserIdParams,
    @Body() updateUserDto: UpdateUserDto,
  ): UserEntity {
    const user = this.userService.updateUser(id, updateUserDto);
    if (!user) throw new NotFoundException();
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: UserIdParams): void {
    const user = this.userService.remove(id);
    if (!user) throw new NotFoundException();
  }
}
