import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { TagsModule } from './tags/tags.module';
import { TargetModule } from './target/target.module';
import { TaskModule } from './task/task.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TagModule,
    TaskModule,
    TargetModule,
    TasksModule,
    TagsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
