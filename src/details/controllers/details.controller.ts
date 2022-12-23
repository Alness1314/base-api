import { ResponseDetailDto } from './../dto/respose-detail.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DetailsService } from '../services/details.service';
import { CreateDetailDto } from '../dto/create-detail.dto';
import { UpdateDetailDto } from '../dto/update-detail.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';

@ApiTags('Details')
@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  //@Auth( ValidRoles.employee, ValidRoles.admin )
  @ApiResponse({status: 201, description: 'details was created', type: ResponseDetailDto})
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get()
  //@Auth()
  findAll() {
    return this.detailsService.findAll();
  }

  @Get(':id')
  //@Auth( ValidRoles.employee, ValidRoles.admin )
  findOne(@Param('id') id: string) {
    return this.detailsService.findOne(id);
  }

  @Put(':id')
  //@Auth( ValidRoles.admin )
  update(@Param('id') id: string, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailsService.update(id, updateDetailDto);
  }

  @Delete(':id')
  //@Auth( ValidRoles.admin )
  remove(@Param('id') id: string) {
    return this.detailsService.remove(id);
  }
}
