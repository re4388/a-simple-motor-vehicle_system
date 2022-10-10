import { Module } from '@nestjs/common';
import { MotorVehicleOwnerService } from './motor-vehicle-owner.service';
import { MotorVehicleOwnerController } from './motor-vehicle-owner.controller';
import { MotorVehicleOwner } from './entities/motor-vehicle-owner.entity';
import { MotorVehicle } from '../motor-vehicles/entities/motor-vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MotorVehicleOwner]), MotorVehicle],
  exports: [TypeOrmModule, MotorVehicleOwnerService],
  controllers: [MotorVehicleOwnerController],
  providers: [MotorVehicleOwnerService]
})
export class MotorVehicleOwnerModule { }
