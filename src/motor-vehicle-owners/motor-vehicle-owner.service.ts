import { Injectable } from '@nestjs/common';
import { CreateMotorVehicleOwnerDto } from './dto/create-motor-vehicle-owner.dto';
import { UpdateMotorVehicleOwnerDto } from './dto/update-motor-vehicle-owner.dto';

@Injectable()
export class MotorVehicleOwnerService {
  create(createMotorVehicleOwnerDto: CreateMotorVehicleOwnerDto) {
    return 'This action adds a new motorVehicleOwner';
  }

  findAll() {
    return `This action returns all motorVehicleOwner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motorVehicleOwner`;
  }

  update(id: number, updateMotorVehicleOwnerDto: UpdateMotorVehicleOwnerDto) {
    return `This action updates a #${id} motorVehicleOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} motorVehicleOwner`;
  }
}
