import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户', description: '创建用户的接口' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get()
  @ApiQuery({ name: 'keyWord', description: '姓名关键词' })
  @ApiQuery({ name: 'page', description: '页数' })
  @ApiQuery({ name: 'pageSize', description: '每页总数' })
  findAll(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    return this.userService.findAll(query);
  }

  @Post(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}
