import { ApiProperty } from '@nestjs/swagger';

enum Status {
  Pending = 'Pending',
  Completed = 'Completed',
}

export class CreateTaskInput {
  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'number' })
  duration: number;

  @ApiProperty({ type: 'string', nullable: true })
  start?: string;

  @ApiProperty({ type: 'number', nullable: true })
  date?: number;

  @ApiProperty({ type: 'string', required: false })
  description?: string;

  @ApiProperty({
    enum: Status,
    default: Status.Pending,
    example: Status.Pending,
  })
  status: string;

  @ApiProperty({
    type: 'string',
    description: 'project Id',
  })
  project: string;

  @ApiProperty({
    type: 'string',
    description: 'target Id',
    required: false,
  })
  target?: string;
}

export class UpdateTaskInput {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string', nullable: true })
  title?: string;

  @ApiProperty({ type: 'number', nullable: true })
  duration?: number;

  @ApiProperty({ type: 'string', nullable: true })
  start?: string;

  @ApiProperty({ type: 'number', nullable: true })
  date?: number;

  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    enum: Status,
    default: Status.Pending,
    example: Status.Pending,
  })
  status?: string;

  @ApiProperty({
    type: 'string',
    description: 'project Id',
    required: false,
  })
  project?: string;

  @ApiProperty({
    type: 'string',
    description: 'target Id',
    required: false,
  })
  target?: string;
}
