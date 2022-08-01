import { Detail } from './../../details/entities/detail.entity';
import { Role } from './../../roles/entities/role.entity';
import { User } from './../entities/user.entity';
import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from '../dto';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { DetailsService } from 'src/details/services/details.service';
import { UpdateDetailDto } from 'src/details/dto/update-detail.dto';


@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly _userRespository: Repository<User>,
    @InjectRepository(Role)
    private readonly _roleRespository: Repository<Role>,
    private readonly _detailService: DetailsService,
  ){}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = this._userRespository.create(createUserDto);
    let user: User;
    const detail = await this._detailService.create(createUserDto.detail);
    let list: Role[] = [];
    for (const iterator of createUserDto.rolesId) {
      const temp = await this._roleRespository.findOneBy({id: iterator});
      if(!temp){
        throw new NotFoundException('role not found');
      }
      console.log(JSON.stringify(temp));
      list.push(temp)
    }
    try {
      newUser.detail = detail;
      newUser.roles = list;
      user = await this._userRespository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const listUser = await this._userRespository.find({
      relations: ['roles', 'detail']
    });
    return plainToInstance(ResponseUserDto, listUser);
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this._userRespository.findOne({
      relations: ['roles', 'detail'],
      where:{id}
    })
    if(!user){
      throw new NotFoundException(`User ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //response user updated
    let updateUser: User;

    //search user for update
    const tempUser = await this.findOne(id);
    const user = plainToInstance(User, tempUser);
    this._userRespository.merge(user, updateUserDto);

    //Role assing to update
    var list: Role[] = user.roles;

    if(updateUserDto.rolesId){
      for (const roleId of updateUserDto.rolesId) {
        const temp = await this._roleRespository.findOneBy({id: roleId});
        if(!temp){
          throw new NotFoundException('role not found');
        }
        list.push(temp)
      }
    }

    //Details update
    var detail: Detail;
    if(updateUserDto.detail){
      detail = await this._detailService.update(user.detail.id, updateUserDto.detail);
    }
    
    try {
      user.roles = list;
      updateUser = await this._userRespository.save(user);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    const removeUser = plainToInstance(User, user);
    await this._userRespository.remove(removeUser);

    //delete detail 
    await this._detailService.remove(user.detail.id);

    return {
      reponse: HttpStatus.ACCEPTED,
      message: `Deleted user with email: ${user.email} `,
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
