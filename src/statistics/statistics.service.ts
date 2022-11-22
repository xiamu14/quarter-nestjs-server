import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  public async getTotal() {
    const allTasks = await this.prisma.task.count();
    const completedTasks = await this.prisma.task.count({
      where: {
        status: 'Finish',
      },
    });
    const unfinishedTasks = allTasks - completedTasks;
    return {
      allTasks,
      completedTasks,
      unfinishedTasks,
    };
  }
}
