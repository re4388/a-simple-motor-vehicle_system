import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorVehicleOwner } from '../motor-vehicle-owners/entities/motor-vehicle-owner.entity';
import { CreateMotorVehicleDto } from './dto/create-motor-vehicle.dto';
import { UpdateMotorVehicleDto } from './dto/update-motor-vehicle.dto';
import { MotorVehicle } from './entities/motor-vehicle.entity';

@Injectable()
export class MotorVehicleService {
  constructor(
    @InjectRepository(MotorVehicle)
    private vehicleRepo: Repository<MotorVehicle>,
  ) { }

  async create(
    motorVehicleOwner: MotorVehicleOwner,
    createMotorVehicleDto: CreateMotorVehicleDto
  ) {

    const motorVehicle = this.vehicleRepo.create({
      licensePlateNumber: createMotorVehicleDto.licensePlateNumber,
      motorVehicleType: createMotorVehicleDto.motorVehicleType,
      manufactureDate: createMotorVehicleDto.manufactureDate,
      motorVehicleOwner: motorVehicleOwner
    })

    await this.vehicleRepo.save(motorVehicle);
    return motorVehicle;
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
