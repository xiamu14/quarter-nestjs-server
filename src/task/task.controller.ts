import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskInput, UpdateTaskInput } from './dto';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'string',
  })
  async getTask(@Query('id') id?: string) {
    return this.service.getTaskById(id);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: CreateTaskInput,
  })
  async create(
    @Req()
    req: { user: User },
    @Body() data: CreateTaskInput,
  ) {
    try {
      await this.service.createTask({
        ...data,
        user: { connect: { id: req.user.id } },
      });
      return { data: 'success' };
    } catch (error) {
      console.error(error);
      return { errMessage: 'create fail' };
    }
  }

  @Put('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: UpdateTaskInput,
  })
  async update(@Body() updateTaskInput: UpdateTaskInput) {
    try {
      await this.service.updateTask(updateTaskInput);
      return { data: 'success' };
    } catch (error) {
      return { errMessage: 'update fail' };
    }
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'string',
  })
  async delete(@Query('id') id?: string) {
    if (id) {
      await this.service.deleteTaskById(id);
      return { data: 'success' };
    }
    return { errMessage: 'missing task id.' };
  }
}
