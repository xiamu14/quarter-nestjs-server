import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';

export class GetProjectInput {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string', nullable: true })
  from: string;

  @ApiProperty({ type: 'string', nullable: true })
  to: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  target?: string;

  @ApiProperty({
    enum: ProjectStatus,
    default: ProjectStatus.Doing,
    example: ProjectStatus.Doing,
  })
  status: string;
}

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

  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  color?: string;
}
