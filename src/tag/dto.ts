import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ type: 'string', nullable: true })
  name?: string;

  @ApiProperty({ type: 'string', nullable: true })
  color?: string;
}
