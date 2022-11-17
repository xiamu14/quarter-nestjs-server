import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get('/week')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    type: 'string',
    name: 'week',
    description: '周一的日期时间戳：1662307200000',
  })
  async getTasksOnWeek(
    @Req()
    req: { user: User },
    @Query('week') week: string,
  ) {
    return this.service.getTasksOnWeek({
      userId: req.user.id,
      week: week,
    });
  }

  @Get('/day')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    type: 'string',
    name: 'day',
    description: '某一天的时间戳：1662307200000',
  })
  async getTasksOnDay(
    @Req()
    req: { user: User },
    @Query('day') day: string,
  ) {
    return this.service.getTasksOnDay({
      userId: req.user.id,
      day,
    });
  }

  @Get('/overdue')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTasksOverdue(
    @Req()
    req: {
      user: User;
    },
  ) {
    return this.service.getTasksOverdue({
      userId: req.user.id,
    });
  }
}
