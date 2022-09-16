import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';

const client = new PrismaClient();

async function fixStart() {
  const tasks = (await client.task.findMany()).filter((it) =>
    dayjs(it.start).isValid(),
  );

  tasks.forEach(async (task) => {
    const result = await client.task.update({
      where: {
        id: task.id,
      },
      data: {
        start: dayjs(new Date(task.start).getTime()).format('HH:mm'),
      },
    });
    console.log(result);
  });
}

fixStart();
