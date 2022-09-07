import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { TagsModule } from './tags/tags.module';
import { TargetModule } from './target/target.module';
import { TaskModule } from './task/task.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TagModule, TaskModule, TargetModule, TasksModule, TagsModule],
})
export class AppModule {}
