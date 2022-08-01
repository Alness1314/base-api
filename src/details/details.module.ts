import { Detail } from './entities/detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DetailsService } from './services/details.service';
import { DetailsController } from './controllers/details.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Detail])],
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService, TypeOrmModule]
})
export class DetailsModule {}
