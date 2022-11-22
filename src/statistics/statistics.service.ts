import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';
import { getMondayTimeStamp } from '../utils/date';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  public async getTotal() {
    const monday = getMondayTimeStamp(dayjs());
    const gte = new Date(monday);
    const lte = new Date(
      dayjs(monday).add(8, 'day').format('YYYY-MM-DD'),
    );
    const allTasks = await this.prisma.task.count({
      where: { date: { gte, lte } },
    });
    const completedTasks = await this.prisma.task.count({
      where: {
        status: 'Finish',
        date: { gte, lte },
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
