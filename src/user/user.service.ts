import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async paginate(page = 1): Promise<any> {
    const take = 1;
    const [users, total] = await this.userRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });
    return {
      data: users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...data } = user;
        return data;
      }),
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data: any) {
    return await this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return await this.userRepository.findOne({
      where: condition,
    });
  }
  async update(id: number, data) {
    await this.userRepository.update(id, data);
    return await this.findOne({ id });
  }
  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
