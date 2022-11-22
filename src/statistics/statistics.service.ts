import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { PrismaService } from '../prisma/prisma.service';
import { getWeekStamp, getYear } from '../utils/date';

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

  // 获取一年里每天任务耗时情况
  public async getYearTasks(query: { userId: string }) {
    const { start, end } = getYear(dayjs());
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: query.userId,
        date: {
          gte: new Date(start.valueOf()),
          lte: new Date(end.valueOf()),
        },
      },
    });
    const groupedTasks = groupBy(tasks, 'date');
    return groupedTasks;
  }
}
