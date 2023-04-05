import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: UpdateUserDto,
  })
  @Post('update')
  public async update(
    @Request() req,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.update(
      req.user.id,
      data,
    );
    return user;
  }
}
