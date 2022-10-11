import { Module } from '@nestjs/common';
import { MotorVehicleService } from './motor-vehicle.service';
import { MotorVehicleController } from './motor-vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorVehicle } from './entities/motor-vehicle.entity';
import { MotorVehicleOwnerModule } from '../motor-vehicle-owners/motor-vehicle-owner.module';
import { ExaminationModule } from '../examinations/examination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotorVehicle]),
    ExaminationModule,
    MotorVehicleOwnerModule],
  exports: [TypeOrmModule, MotorVehicleService],
  controllers: [MotorVehicleController],
  providers: [MotorVehicleService]
})
export class MotorVehicleModule { }
