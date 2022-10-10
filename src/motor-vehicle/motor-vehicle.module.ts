import { Module } from '@nestjs/common';
import { MotorVehicleService } from './motor-vehicle.service';
import { MotorVehicleController } from './motor-vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorVehicleOwner } from '../motor-vehicle-owner/entities/motor-vehicle-owner.entity';
import { Examination } from '../examination/entities/examination.entity';
import { MotorVehicle } from './entities/motor-vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotorVehicle]),
    Examination,
    MotorVehicleOwner],
  exports: [TypeOrmModule, MotorVehicleService],
  controllers: [MotorVehicleController],
  providers: [MotorVehicleService]
})
export class MotorVehicleModule { }
