import { Injectable } from '@nestjs/common';
import {
  transformTaskForCreate,
  transformTaskForUpdate,
  transformTaskToClient,
} from '../lib/utils';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput, UpdateTaskInput } from './dto';

interface CreateTaskInputDb extends CreateTaskInput {
  user: { connect: { id: string } };
}

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  /**
   * getTaskById
id: string   */
  public async getTaskById(id?: string) {
    if (!id)
      return { errorMessage: 'not Found', data: null };
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { project: true, target: true },
    });
    if (task) {
      const taskData = transformTaskToClient(task);
      return { data: taskData };
    } else {
      return { errMessage: 'not Found', data: null };
    }
  }

  public async createTask(data: CreateTaskInputDb) {
    const formatData = transformTaskForCreate(data);

    return this.prisma.task.create({ data: formatData });
  }

  public async updateTask(data: UpdateTaskInput) {
    const formatData = transformTaskForUpdate(data);

    return this.prisma.task.update({
      data: formatData,
      where: { id: data.id },
      include: {
        project: true,
      },
    });
  }

  public async deleteTaskById(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
