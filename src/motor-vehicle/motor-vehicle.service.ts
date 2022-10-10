import { Injectable } from '@nestjs/common';
import { CreateMotorVehicleDto } from './dto/create-motor-vehicle.dto';
import { UpdateMotorVehicleDto } from './dto/update-motor-vehicle.dto';

@Injectable()
export class MotorVehicleService {
  create(createMotorVehicleDto: CreateMotorVehicleDto) {
    return 'This action adds a new motorVehicle';
  }

  findAll() {
    return `This action returns all motorVehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motorVehicle`;
  }

  update(id: number, updateMotorVehicleDto: UpdateMotorVehicleDto) {
    return `This action updates a #${id} motorVehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} motorVehicle`;
  }
}
