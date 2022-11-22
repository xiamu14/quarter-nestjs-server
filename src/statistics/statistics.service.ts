import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';
import { getWeekStamp } from '../utils/date';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  public async getTotal(query: { userId: string }) {
    const { monday: gte, sunday: lte } = getWeekStamp(
      dayjs(),
    );
    const allTasks = await this.prisma.task.count({
      where: { date: { gte, lte }, userId: query.userId },
    });
    const completedTasks = await this.prisma.task.count({
      where: {
        status: 'Finish',
        date: { gte, lte },
        userId: query.userId,
      },
    });
    const unfinishedTasks = allTasks - completedTasks;
    return {
      allTasks,
      completedTasks,
      unfinishedTasks,
    };
  }

  // 获取项目任务分布信息
  public async getProjectTasks(query: { userId: string }) {
    const { monday: gte, sunday: lte } = getWeekStamp(
      dayjs(),
    );
    const projects = await this.prisma.project.findMany({
      where: {
        status: 'Doing',
        userId: query.userId,
      },
      include: {
        tasks: {
          where: {
            date: { gte, lte },
          },
        },
      },
    });
    return projects;
  }
}
