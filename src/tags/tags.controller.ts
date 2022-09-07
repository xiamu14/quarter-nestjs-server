import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TagStatus } from '@prisma/client';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private service: TagsService) {}

  @Get('/')
  @ApiQuery({
    enum: TagStatus,
    name: 'status',
  })
  @ApiQuery({
    type: 'string',
    name: 'userId',
  })
  async get(
    @Query('status') status: TagStatus,
    @Query('userId') userId: string,
  ) {
    try {
      return this.service.getTags({ status, userId });
    } catch (error) {
      return { errMessage: 'service error' };
    }
  }
}
