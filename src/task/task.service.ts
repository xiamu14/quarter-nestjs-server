import { Injectable } from '@nestjs/common';
import {
  transformTaskForCreate,
  transformTaskForUpdate,
  transformTaskToClient,
} from '../lib/utils';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput, UpdateTaskInput } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  /**
   * getTaskById
id: string   */
  public async getTaskById(id?: string) {
    if (!id) return { errorMessage: 'not Found', data: null };
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { tag: true },
    });
    if (task) {
      const taskData = transformTaskToClient(task);
      return { data: taskData };
    } else {
      return { errMessage: 'not Found', data: null };
    }
  }

  public async createTask(data: CreateTaskInput) {
    const formatData = transformTaskForCreate(data);

    return this.prisma.task.create({ data: formatData });
  }

  public async updateTask(data: UpdateTaskInput) {
    const formatData = transformTaskForUpdate(data);

    return this.prisma.task.update({
      data: formatData,
      where: { id: data.id },
      include: {
        tag: true,
      },
    });
  }

  public async deleteTaskById(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
