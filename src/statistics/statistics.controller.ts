import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private service: StatisticsService) {}

  @Get('/total')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTotal(
    @Req()
    req: {
      user: User;
    },
  ) {
    return this.service.getTotal({ userId: req.user.id });
  }

  @Get('/projectTasks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getProjectTasks(
    @Req()
    req: {
      user: User;
    },
  ) {
    return this.service.getProjectTasks({
      userId: req.user.id,
    });
  }

  @Get('/yearTasks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getYearTasks(
    @Req()
    req: {
      user: User;
    },
  ) {
    return this.service.getYearTasks({
      userId: req.user.id,
    });
  }
}
