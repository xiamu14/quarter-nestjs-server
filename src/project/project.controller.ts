import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateProjectInput,
  UpdateProjectInput,
} from './dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: CreateProjectInput,
  })
  async createTag(
    @Req()
    req: { user: User },
    @Body() data?: CreateProjectInput,
  ) {
    if (data) {
      await this.service.create({
        ...data,
        user: { connect: { id: req.user.id } },
      });
      return { data: 'success' };
    }
    return { errMessage: 'create fail' };
  }

  @Put('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: UpdateProjectInput,
  })
  async updateTag(@Body() data?: UpdateProjectInput) {
    if (data) {
      await this.service.update(data);
      return { data: 'success' };
    }
    return { errMessage: 'update fail' };
  }
}
