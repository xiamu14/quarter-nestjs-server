import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';

@Module({
  controllers: [TargetController],
  providers: [TargetService, PrismaService],
})
export class TargetModule {}
