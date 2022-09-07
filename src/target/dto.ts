import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetInput {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string', description: '项目 ID' })
  tag: string;

  @ApiProperty({ type: 'string' })
  userId: string;

  @ApiProperty({ type: 'number' })
  date: number;

  @ApiProperty({ type: 'string', required: false })
  description?: string;
}

export class UpdateTargetInput {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string', nullable: true })
  userId: string;

  @ApiProperty({ type: 'number', nullable: true })
  date?: number;

  @ApiProperty({ type: 'string', nullable: true })
  name?: string;

  @ApiProperty({ type: 'string', required: false })
  description?: string;
}
