import { plainToInstance } from 'class-transformer';
import { Role } from './../entities/role.entity';
import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, ResponseRolDto, UpdateRoleDto } from '../dto';

@Injectable()
export class RolesService {

  private readonly logger = new Logger('RolesService');

  constructor(
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>,
  ){}

  async create(createRoleDto: CreateRoleDto): Promise<ResponseRolDto> {
    const newRol = this._roleRepository.create(createRoleDto);
    let rol: Role;
    try {
      rol = await this._roleRepository.save(newRol);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseRolDto, rol)
  }

  async findAll(): Promise<ResponseRolDto[]> {
    const rolList = await this._roleRepository.find();
    return plainToInstance(ResponseRolDto, rolList);
  }

  async findOne(id: string): Promise<ResponseRolDto> {
    const rol = await this._roleRepository.findOneBy({id});
    if(!rol){
      throw new NotFoundException(`Role with id:${id} not found`);
    }
    return plainToInstance(ResponseRolDto, rol);
  }

  async remove(id: string): Promise<any> {
    const role = await this.findOne(id);
    await this._roleRepository.remove(role);
    return {
      reponse: HttpStatus.ACCEPTED,
      message: `Deleted role with name: ${role.name} `,
    }
  }

  private handleDBExceptions(error: any){
    this.logger.error(error)
    if(error.code === 'ER_DUP_ENTRY'){
      throw new ConflictException('Duplicate entry in database')
    }
    console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
