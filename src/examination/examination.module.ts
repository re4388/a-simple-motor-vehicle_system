import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { ExaminationController } from './examination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './entities/examination.entity';
import { MotorVehicle } from '../motor-vehicle/entities/motor-vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Examination]), MotorVehicle],
  exports: [TypeOrmModule, ExaminationService],
  controllers: [ExaminationController],
  providers: [ExaminationService]
})
export class ExaminationModule { }
