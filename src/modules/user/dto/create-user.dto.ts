import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'youli' })
  name: string;
  @ApiProperty({ description: '描述', example: '帅的' })
  desc: string;
}