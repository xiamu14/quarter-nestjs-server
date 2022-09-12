import { Injectable } from '@nestjs/common';
import { TagStatus } from '@prisma/client';
import { transformTagsToClient } from '../lib/utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  public async getTags(data: { status: TagStatus; userId: string }) {
    const tags = await this.prisma.tag.findMany({
      where: data,
      include: {
        tasks: {
          orderBy: {
            priority: 'desc',
          },
        },
        targets: true,
      },
    });
    if (tags.length > 0) {
      const data = transformTagsToClient(tags);
      return data;
    }
    return [];
  }
}
