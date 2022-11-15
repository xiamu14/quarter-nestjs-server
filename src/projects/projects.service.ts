import { Injectable } from '@nestjs/common';
import {
  ProjectStatus,
  TargetStatus,
} from '@prisma/client';
import { transformTagsToClient } from '../lib/utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  public async getTags(data: {
    status: ProjectStatus;
    userId: string;
  }) {
    const tags = await this.prisma.project.findMany({
      where: data,
      include: {
        tasks: {
          orderBy: {
            priority: 'desc',
          },
          where: {
            date: null,
          },
        },
        targets: {
          where: {
            status: TargetStatus.Doing,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    if (tags.length > 0) {
      const data = transformTagsToClient(tags);
      return data;
    }
    return [];
  }
}
