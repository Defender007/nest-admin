import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto, UserCreateSaveDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async all(@Query('page') page = 1): Promise<User[]> {
    return await this.userService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<any> {
    const password = await bcrypt.hash('1234', 12);
    const { role_id, ...data } = body;
    return this.userService.create({
      ...data,
      password,
      role: { id: role_id },
    });
  }

  @Get(':id')
  async get(@Param('id') id) {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;

    return await this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.userService.delete(id);
  }
}
