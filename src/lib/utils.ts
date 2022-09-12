import { Tag, Target, Task } from '@prisma/client';
import { Matcher } from 'data-matcher';
import { CreateTaskInput, UpdateTaskInput } from '../task/dto';
import { CreateTargetInput, UpdateTargetInput } from './../target/dto';
export function transformTaskToClient(data: Task | Task[]) {
  if (Array.isArray(data) && data.length === 0) {
    return data;
  } else {
    const matcher = new Matcher(data);
    matcher
      .editValue('createdAt', handleFormatter)
      .editValue('updatedAt', handleFormatter)
      .editValue('start', handleFormatter)
      .editValue('date', handleFormatter)
      .editValue('expectEnd', handleFormatter);
    return matcher.data;
  }
}

const handleFormatter = (it: string) => {
  return it ? new Date(it).getTime() : it;
};

export function transformTaskForCreate(data: CreateTaskInput) {
  const matcher = new Matcher(data);
  matcher
    .editValue('start', (it) => (it ? new Date(it) : it))
    .editValue('expectEnd', (it) => (it ? new Date(it) : it))
    .editValue('date', (it) => (it ? new Date(it) : it))
    .editValue('tag', (it) => {
      return {
        connect: { id: it },
      };
    });
  return matcher.data;
}

export function transformTaskForUpdate(data: UpdateTaskInput) {
  const matcher = new Matcher(data);
  matcher
    .editValue('start', (it) => (it ? new Date(it) : it))
    .editValue('expectEnd', (it) => (it ? new Date(it) : it))
    .editValue('date', (it) => (it ? new Date(it) : it))
    .editValue('tag', (it) => {
      return {
        connect: { id: it },
      };
    });

  return matcher.data;
}

function isCreateTargetInput(data: any): data is CreateTargetInput {
  return !!data.tag;
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
        (that as any).editValue('tag', (it) => {
          return { connect: { id: it } };
        });
      },
      null,
    );

  return matcher.data;
}

export function transformTargetToClient(data: Target | Target[]) {
  const matcher = new Matcher(data);
  matcher.editValue('date', handleFormatter);

  return matcher.data;
}

interface TagWithTasks extends Tag {
  tasks: Task[];
}

export function transformTagsToClient(data: TagWithTasks[]) {
  const matcher = new Matcher(data);
  matcher
    .editValue('createdAt', handleFormatter)
    .editValue('updatedAt', handleFormatter)
    .editValue('tasks', (it) => transformTaskToClient(it));
  return matcher.data;
}
