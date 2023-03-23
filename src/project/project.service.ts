import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProjectInput,
  GetProjectInput,
  UpdateProjectInput,
} from './dto';

interface CreateProjectInputDb extends CreateProjectInput {
  user: { connect: { id: string } };
}

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  get(data: GetProjectInput) {
    const gte = new Date(parseInt(data.from, 10));
    const lte = new Date(parseInt(data.to, 10));
    const where: Prisma.TaskWhereInput = {
      date: {
        gte,
        lte,
      },
    };
    if (data.target) {
      where.targetId = data.target;
    }
    return this.prisma.project.findUnique({
      where: { id: data.id },
      include: {
        tasks: {
          where,
        },
      },
    });
  }

  create(data: CreateProjectInputDb) {
    return this.prisma.project.create({
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

  update(data: UpdateProjectInput) {
    return this.prisma.project.update({
      data,
      where: { id: data.id },
    });
  }
}
