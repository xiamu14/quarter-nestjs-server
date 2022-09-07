import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get('/week')
  @ApiQuery({
    type: 'string',
    name: 'userId',
  })
  @ApiQuery({
    type: 'string',
    name: 'week',
    description: '周一的日期时间戳：1662307200000',
  })
  async getTasksOnWeek(
    @Query('userId') userId: string,
    @Query('week') week: string,
  ) {
    return this.service.getTasksOnWeek({
      userId,
      week,
    });
  }

  @Get('/day')
  @ApiQuery({
    type: 'string',
    name: 'userId',
  })
  @ApiQuery({
    type: 'string',
    name: 'day',
    description: '某一天的时间戳：1662307200000',
  })
  async getTasksOnDay(
    @Query('userId') userId: string,
    @Query('day') day: string,
  ) {
    return this.service.getTasksOnDay({
      userId,
      day,
    });
  }
}
