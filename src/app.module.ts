import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { ProjectsModule } from './projects/projects.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TargetModule } from './target/target.module';
import { TaskModule } from './task/task.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProjectModule,
    TaskModule,
    TargetModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    StatisticsModule,
  ],
})
export class AppModule {}
