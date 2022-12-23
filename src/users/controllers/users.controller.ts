import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { ResponseUserDto } from '../dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@Auth( ValidRoles.employee, ValidRoles.admin )
  @ApiResponse({status: 201, description: 'user was created', type: ResponseUserDto})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 500, description: 'Internal server error'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  //@Auth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth( ValidRoles.employee, ValidRoles.admin )
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  //@Auth( ValidRoles.admin )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  //@Auth( ValidRoles.admin )
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
