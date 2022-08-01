import { Detail } from './../entities/detail.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseDetailDto } from './../dto/respose-detail.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetailDto } from '../dto/create-detail.dto';
import { UpdateDetailDto } from '../dto/update-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {

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
      console.log(error);
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
    return;
  }

  remove(id: string) {
    return `This action removes a #${id} detail`;
  }
}
