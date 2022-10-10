import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from '../../../examinations/entities/examination.entity';
import { MotorVehicleOwner } from '../../../motor-vehicle-owners/entities/motor-vehicle-owner.entity';
import { MotorVehicle } from '../../../motor-vehicles/entities/motor-vehicle.entity';
import { SeedService } from './seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([Examination, MotorVehicle, MotorVehicleOwner])],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule { }