import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateTargetInput,
  UpdateTargetInput,
} from './dto';
import { TargetService } from './target.service';

@ApiTags('Target')
@Controller('target')
export class TargetController {
  constructor(private readonly service: TargetService) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    type: 'string',
    name: 'projectId',
    required: true,
  })
  async getAll(@Query('projectId') projectId: string) {
    const data = await this.service.getAll({
      projectId,
    });
    return data;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: CreateTargetInput,
  })
  async createTarget(@Body() data?: CreateTargetInput) {
    if (data) {
      await this.service.create(data);
      return { data: 'success' };
    }
    return { errMessage: 'create fail' };
  }

  @Put('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
