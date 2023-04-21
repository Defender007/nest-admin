import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async all() {
    return this.roleService.all();
  }

  @Post()
  async create(@Body('name') name: string, @Body('permissions') ids: number[]) {
    return this.roleService.create({
      name,
      permissions: ids.map((id) => {
        return { id: id };
      }),
    });
  }

  @Get(':id')
  async get(@Param('id') id) {
    return this.roleService.findOne({ id });
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ) {
    await this.roleService.update(id, name);
    const role = await this.roleService.findOne({ id });
    return await this.roleService.create({
      ...role,
      permissions: ids.map((id) => {
        return { id: id };
      }),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.roleService.delete(id);
  }
}
/* {
      name,
      permissions: ids.map((id) => {
        return { id: id };
      }) */
