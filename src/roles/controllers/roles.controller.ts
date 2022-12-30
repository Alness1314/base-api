import { ResponseRolDto } from './../dto/response-role.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Auth( ValidRoles.admin )
  @ApiResponse({status: 201, description: 'role was created', type: ResponseRolDto})
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Auth( ValidRoles.employee, ValidRoles.user, ValidRoles.admin )
  findAll() {
    return this.rolesService.findAll();
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
