import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async all(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async create(data): Promise<Role> {
    return await this.roleRepository.save(data);
  }

  async findOne(condition): Promise<Role> {
    return await this.roleRepository.findOne({
      where: condition,
      relations: ['permissions'],
    });
  }
  async update(id: number, data): Promise<any> {
    await this.roleRepository.update(id, { name: data });
    return await this.findOne({ id });
  }
  async delete(id): Promise<any> {
    return await this.roleRepository.delete(id);
  }
}
