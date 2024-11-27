import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    const user = this.repo.create({
      email,
      password,
    });

    return await this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  async find(email: string) {
    return await this.repo.find({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(user, attrs);

    return await this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return await this.repo.remove(user);
  }
}
