import { ApiProperty } from '@nestjs/swagger';
import { TagStatus } from '@prisma/client';

export class CreateTagInput {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  color: string;

  @ApiProperty({ type: 'string' })
  userId: string;
}

export class UpdateTagInput {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string', nullable: true })
  userId: string;

  @ApiProperty({
    enum: TagStatus,
    required: false,
    description: '项目的状态：进行中，归档',
  })
  status?: TagStatus;

  @ApiProperty({ type: 'string', nullable: true })
  name?: string;

  @ApiProperty({ type: 'string', nullable: true })
  color?: string;
}
