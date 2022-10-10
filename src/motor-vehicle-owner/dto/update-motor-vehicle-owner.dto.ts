import { PartialType } from '@nestjs/mapped-types';
import { CreateMotorVehicleOwnerDto } from './create-motor-vehicle-owner.dto';

export class UpdateMotorVehicleOwnerDto extends PartialType(CreateMotorVehicleOwnerDto) {}
