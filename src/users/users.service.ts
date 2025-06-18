import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { ListUsersDto } from './dto/list-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    if (user) {
      throw new ConflictException('user already exits with this email address');
    }
    const userCreated = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userCreated);
  }

  async get(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, relations: ["posts"] });

    if (!user) {
      throw new NotFoundException('user does not exits');
    }
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async listUsers(listUsersDto: ListUsersDto) {
    const { search, page = 1, limit = 10 } = listUsersDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .select([
        'user.id',
        'user.uid',
        'user.name',
        'user.email',
        'user.image',
        'user.phone',
        'user.role',
        'user.status',
        'user.lastLoginAt',
        'user.createdAt',
        'user.updatedAt',
      ])
      .skip(skip)
      .take(limit);


    if (search) {
      queryBuilder.where(
        '(user.name ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    const [users, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
