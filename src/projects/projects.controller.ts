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
import { ProjectStatus, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    enum: ProjectStatus,
    name: 'status',
  })
  async get(
    @Req()
    req: { user: User },
    @Query('status') status: ProjectStatus,
  ) {
    try {
      return this.service.getTags({
        status,
        userId: req.user.id,
      });
    } catch (error) {
      return { errMessage: 'service error' };
    }
  }
}
