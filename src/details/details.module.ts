import { Detail } from './entities/detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { DetailsService } from './services/details.service';
import { DetailsController } from './controllers/details.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Detail]), AuthModule],
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService, TypeOrmModule]
})
export class DetailsModule {}
