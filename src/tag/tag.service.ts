import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagInput, UpdateTagInput } from './dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTagInput) {
    return this.prisma.tag.create({
      data: {
        ...data,
        tasks: {
          create: [],
        },
        targets: {
          create: [],
        },
      },
    });
  }

  update(data: UpdateTagInput) {
    return this.prisma.tag.update({
      data,
      where: { id: data.id },
    });
  }
}
