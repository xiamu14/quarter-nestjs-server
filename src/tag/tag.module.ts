import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  controllers: [TagController],
  providers: [TagService, PrismaService],
})
export class TagModule {}
