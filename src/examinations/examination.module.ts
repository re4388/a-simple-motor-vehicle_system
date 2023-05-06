import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { ExaminationController } from './examination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './entities/examination.entity';
import { MotorVehicleModule } from '../motor-vehicles/motor-vehicle.module';
import { MotorVehicle } from '../motor-vehicles/entities/motor-vehicle.entity';
import { MotorVehicleOwner } from '../motor-vehicle-owners/entities/motor-vehicle-owner.entity';
import { MotorVehicleOwnerModule } from '../motor-vehicle-owners/motor-vehicle-owner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Examination, MotorVehicle, MotorVehicleOwner]),
    MotorVehicleModule,
    MotorVehicleOwnerModule,
  ],
  exports: [TypeOrmModule, ExaminationService],
  controllers: [ExaminationController],
  providers: [ExaminationService],
})
export class ExaminationModule {}
