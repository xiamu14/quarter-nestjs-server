import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private service: StatisticsService) {}

  @Get('/total')
  async getTotal() {
    return this.service.getTotal();
  }
}
