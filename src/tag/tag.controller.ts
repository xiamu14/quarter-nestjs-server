import {
  Body,
  Controller,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTagInput, UpdateTagInput } from './dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Post('/')
  @ApiBody({
    required: true,
    type: CreateTagInput,
  })
  async createTag(@Body() data?: CreateTagInput) {
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
    type: UpdateTagInput,
  })
  async updateTag(@Body() data?: UpdateTagInput) {
    if (data) {
      await this.service.update(data);
      return { data: 'success' };
    }
    return { errMessage: 'update fail' };
  }
}
