import { Task } from '@prisma/client';

export enum Status {
  Pending = 'Pending',
  Finish = 'Finish',
}

export interface TaskClient
  extends Omit<Task, 'start' | 'expectEnd' | 'createdAt' | 'updatedAt'> {
  start: number | null;
  expectEnd: number | null;
  createdAt: number;
  updatedAt: number;
  tag: string | null;
  tagId: string | null;
}

export interface TaskInput {
  title: string;
  start?: number;
  expectEnd?: number;
  date?: number;
  status: string;
  tag?: string;
}

export interface TaskUpdateInput extends Partial<TaskInput> {
  id: string;
}
