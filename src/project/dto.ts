import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectInput {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  color: string;
}

export class UpdateProjectInput {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({
    enum: ProjectStatus,
    required: false,
    description: '项目的状态：进行中，归档',
  })
  status?: ProjectStatus;

  @ApiProperty({ type: 'string', nullable: true })
  name?: string;

  @ApiProperty({ type: 'string', nullable: true })
  color?: string;
}
