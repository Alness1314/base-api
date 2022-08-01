import { Detail } from './../entities/detail.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseDetailDto } from './../dto/respose-detail.dto';
import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDetailDto } from '../dto/create-detail.dto';
import { UpdateDetailDto } from '../dto/update-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {

  private readonly logger = new Logger('DetailsService');

  constructor(
    @InjectRepository(Detail)
    private readonly _detailRepository: Repository<Detail>,
  ){}

  async create(createDetailDto: CreateDetailDto): Promise<ResponseDetailDto> {
    const newDetail = this._detailRepository.create(createDetailDto);
    let detail: Detail;
    try {
      detail = await this._detailRepository.save(newDetail);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseDetailDto, detail);
  }

  async findAll(): Promise<ResponseDetailDto[]> {
    const list = await this._detailRepository.find();
    return plainToInstance(ResponseDetailDto, list);
  }

  async findOne(id: string): Promise<ResponseDetailDto> {
    const detail = await this._detailRepository.findOneBy({id});
    if(!detail){
      throw new NotFoundException('Detail not found');
    }
    return plainToInstance(ResponseDetailDto, detail);
  }

  async update(id: string, updateDetailDto: UpdateDetailDto): Promise<ResponseDetailDto> {
    const detail = await this.findOne(id);
    let updateDetail: Detail;
    this._detailRepository.merge(detail, updateDetailDto);
    try {
      updateDetail = await this._detailRepository.save(detail);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseDetailDto, detail);
  }

  async remove(id: string): Promise<any> {
    const detail = await this.findOne(id);
    await this._detailRepository.remove(detail);
    return {
      reponse: HttpStatus.ACCEPTED,
      message: `Deleted details from user with name: ${detail.name} `,
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
