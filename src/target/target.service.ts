import { Injectable } from '@nestjs/common';
import {
  transformTargetForDb,
  transformTargetToClient,
} from '../lib/utils';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTargetInput,
  UpdateTargetInput,
} from './dto';

@Injectable()
export class TargetService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: { projectId: string }) {
    const data = await this.prisma.target.findMany({
      where: query,
      include: { project: true },
    });
    if (data.length > 0) {
      return transformTargetToClient(data);
    }
    return data;
  }

  async create(data: CreateTargetInput) {
    return this.prisma.target.create({
      data: {
        ...transformTargetForDb(data),
      },
    });
  }

  async update(data: UpdateTargetInput) {
    return this.prisma.target.update({
      data: transformTargetForDb(data),
      where: { id: data.id },
    });
  }

  async deleteTargetById(id: string) {
    return await this.prisma.target.delete({
      where: { id },
    });
  }
}
