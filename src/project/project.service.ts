import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProjectInput,
  UpdateProjectInput,
} from './dto';

interface CreateProjectInputDb extends CreateProjectInput {
  user: { connect: { id: string } };
}

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

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
