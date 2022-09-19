import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { transformTaskToClient } from '../lib/utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasksOnWeek(query: {
    week: string;
    userId: string;
  }) {
    const weekTimeStamp = parseInt(query.week, 10);
    const gte = new Date(weekTimeStamp);
    const lte = new Date(
      dayjs(weekTimeStamp)
        .add(8, 'day')
        .format('YYYY-MM-DD'),
    );
    const data = await this.prisma.task.findMany({
      where: {
        date: {
          gte,
          lte,
        },
        userId: query.userId,
      },
      include: { tag: true },
    });
    return data.length > 0
      ? transformTaskToClient(data)
      : [];
  }

  async getTasksOnDay(query: {
    day: string;
    userId: string;
  }) {
    const dayTimeStamp = parseInt(query.day, 10);
    const gte = new Date(dayTimeStamp);
    const lte = new Date(
      dayjs(dayTimeStamp)
        .add(1, 'day')
        .format('YYYY-MM-DD'),
    );
    const data = await this.prisma.task.findMany({
      where: {
        date: {
          gte,
          lte,
        },
        userId: query.userId,
      },
      include: { tag: true },
    });
    return data.length > 0
      ? transformTaskToClient(data)
      : [];
  }
}
