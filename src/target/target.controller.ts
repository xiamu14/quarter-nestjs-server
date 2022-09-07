import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTargetInput, UpdateTargetInput } from './dto';
import { TargetService } from './target.service';

@ApiTags('target')
@Controller('target')
export class TargetController {
  constructor(private readonly service: TargetService) {}

  @Get('/all')
  @ApiQuery({
    type: 'string',
    name: 'userId',
  })
  @ApiQuery({
    type: 'string',
    name: 'tagId',
    required: false,
  })
  async getAll(
    @Query('userId') userId: string,
    @Query('tagId') tagId?: string,
  ) {
    const data = await this.service.getAll({ userId, tagId });
    return data;
  }

  @Post('/')
  @ApiBody({
    required: true,
    type: CreateTargetInput,
  })
  async createTarget(@Body() data?: CreateTargetInput) {
    console.log(
      '%c data',
      'color:white;background: rgb(83,143,204);padding:4px',
      data,
    );
    if (data) {
      await this.service.create(data);
      return { data: 'success' };
    }
    return { errMessage: 'create fail' };
  }

  @Put('/')
  @ApiBody({
    required: true,
    type: UpdateTargetInput,
  })
  async updateTarget(@Body() data?: UpdateTargetInput) {
    if (data) {
      await this.service.update(data);
      return { data: 'success' };
    }
    return { errMessage: 'update fail' };
  }

  @Delete('/')
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'string',
  })
  async delete(@Query('id') id?: string) {
    if (id) {
      await this.service.deleteTargetById(id);
      return { data: 'success' };
    }
    return { errMessage: 'missing target id.' };
  }
}
