import { ApiProperty } from '@nestjs/swagger';

enum Status {
  Pending = 'Pending',
  Completed = 'Completed',
}

export class CreateTaskInput {
  @ApiProperty({ type: 'string' })
  userId: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'number', nullable: true })
  start?: number;

  @ApiProperty({ type: 'number', nullable: true })
  expectEnd?: number;

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

  @ApiProperty({ type: 'string', description: 'tag Id' })
  tag: string;
}

export class UpdateTaskInput {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  userId: string;

  @ApiProperty({ type: 'string', nullable: true })
  title?: string;

  @ApiProperty({ type: 'number', nullable: true })
  start?: number;

  @ApiProperty({ type: 'number', nullable: true })
  expectEnd?: number;

  @ApiProperty({ type: 'number', nullable: true })
  date?: number;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;

  @ApiProperty({
    enum: Status,
    default: Status.Pending,
    example: Status.Pending,
  })
  status?: string;

  @ApiProperty({ type: 'string', nullable: true, description: 'tag Id' })
  tag?: string;
}
