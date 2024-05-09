import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../guard/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;

    return this.user.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const { keyWord, page, pageSize } = query;
    const data = await this.user.find({
      where: {
        name: Like(`%${keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.user.count({
      where: {
        name: Like(`%${keyWord}%`),
      },
    });

    return {
      data,
      total,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
