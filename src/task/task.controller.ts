import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskInput, UpdateTaskInput } from './dto';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get('/')
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'string',
  })
  async getTask(@Query('id') id?: string) {
    return this.service.getTaskById(id);
  }

  @Post('/')
  @ApiBody({
    required: true,
    type: CreateTaskInput,
  })
  async create(@Body() createTaskInput: CreateTaskInput) {
    console.log('---', createTaskInput);
    try {
      await this.service.createTask(createTaskInput);
      return { data: 'success' };
    } catch (error) {
      console.error(error);
      return { errMessage: 'create fail' };
    }
  }

  @Put('/')
  @ApiBody({
    required: true,
    type: UpdateTaskInput,
  })
  async update(@Body() updateTaskInput: UpdateTaskInput) {
    console.log('---', updateTaskInput);
    try {
      await this.service.updateTask(updateTaskInput);
      return { data: 'success' };
    } catch (error) {
      return { errMessage: 'update fail' };
    }
  }

  @Delete('/')
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
