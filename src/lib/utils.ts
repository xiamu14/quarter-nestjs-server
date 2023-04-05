import { Project, Target, Task } from '@prisma/client';
import { Matcher } from 'data-matcher';
import {
  CreateTaskInput,
  UpdateTaskInput,
} from '../task/dto';
import {
  CreateTargetInput,
  UpdateTargetInput,
} from './../target/dto';
export function transformTaskToClient(data: Task | Task[]) {
  if (Array.isArray(data) && data.length === 0) {
    return data;
  } else {
    const matcher = new Matcher(data);
    matcher
      .editValue('date', handleFormatter)
      .delete(['createdAt', 'updatedAt']);
    return matcher.data;
  }
}

const handleFormatter = (it: string) => {
  return it ? new Date(it).getTime() : it;
};

export function transformTaskForCreate(
  data: CreateTaskInput,
) {
  const matcher = new Matcher(data);
  matcher
    .when(
      Boolean(data?.date),
      (that) =>
        that.editValue('date', (it) => new Date(it)),
      (that) => that.delete(['date']), // 容错处理
    )
    .editValue('date', (it) => (it ? new Date(it) : it))
    .editValue('project', (it) => {
      return {
        connect: { id: it },
      };
    })
    .editValue('target', (it) => {
      return {
        connect: { id: it },
      };
    });
  return matcher.data;
}

export function transformTaskForUpdate(
  data: UpdateTaskInput,
) {
  const matcher = new Matcher(data);
  console.log('debug', Boolean(data?.target), data?.target);
  matcher
    .editValue('date', (it) => (it ? new Date(it) : it))
    .editValue('project', (it) => {
      return {
        connect: { id: it },
      };
    })
    .when(
      Boolean(data?.target),
      (that) => {
        that.editValue('target', (it) => {
          return {
            connect: { id: it },
          };
        });
      },
      (that) => {
        if ('target' in data) {
          that.delete(['target']);
        } else {
          that.add('target', () => {
            return {
              disconnect: true,
            };
          });
        }
      },
    );

  return matcher.data;
}

function isCreateTargetInput(
  data: any,
): data is CreateTargetInput {
  return !!data.project;
}

export function transformTargetForDb(
  data: CreateTargetInput | UpdateTargetInput,
) {
  const matcher = new Matcher(data);
  matcher
    .editValue('date', (it) => new Date(it))
    .when(
      isCreateTargetInput(data),
      (that) => {
        (that as any).editValue('project', (it) => {
          return { connect: { id: it } };
        });
      },
      null,
    );

  return matcher.data;
}

export function transformTargetToClient(
  data: Target | Target[],
) {
  const matcher = new Matcher(data);
  matcher
    .editValue('date', handleFormatter)
    .delete(['createdAt', 'updatedAt']);

  return matcher.data;
}

interface ProjectWithTasks extends Project {
  tasks: Task[];
}

export function transformTagsToClient(
  data: ProjectWithTasks[],
) {
  const matcher = new Matcher(data);
  matcher
    .editValue('tasks', (it) => transformTaskToClient(it))
    .delete(['createdAt', 'updatedAt']);
  return matcher.data;
}
