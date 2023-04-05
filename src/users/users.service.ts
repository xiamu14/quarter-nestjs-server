import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';

const { hash } = bcrypt;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException(
        'user_already_exist',
        HttpStatus.CONFLICT,
      );
    }
    const { password: _, ...rest } =
      await this.prisma.user.create({
        data: {
          ...userDto,
          password: await hash(userDto.password, 10),
        },
      });
    await this.prisma.project.create({
      data: {
        name: '默认',
        color: '#eaf6e1',
        user: {
          connect: { id: rest.id },
        },
      },
    });
    return rest;
  }

  async update(
    id: string,
    userDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userDto,
    });
    return user;
  }

  async findByEmail({ email, password }: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        'invalid_credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // compare passwords
    const isEqual = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isEqual) {
      throw new HttpException(
        'invalid_password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const { password: _, ...rest } = user;
    return rest;
  }

  async findByPayload({ sub }: { sub: string }) {
    const { password: _, ...rest } =
      await this.prisma.user.findUnique({
        where: { id: sub },
      });
    return rest;
  }
}
