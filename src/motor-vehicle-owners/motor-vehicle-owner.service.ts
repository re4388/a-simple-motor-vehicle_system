import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMotorVehicleOwnerDto } from './dto/create-motor-vehicle-owner.dto';
import { UpdateMotorVehicleOwnerDto } from './dto/update-motor-vehicle-owner.dto';
import { MotorVehicleOwner } from './entities/motor-vehicle-owner.entity';

@Injectable()
export class MotorVehicleOwnerService {
  constructor(
    @InjectRepository(MotorVehicleOwner)
    private repositoryMotorVehicleOwner: Repository<MotorVehicleOwner>
  ) { }

  create(createMotorVehicleOwnerDto: CreateMotorVehicleOwnerDto) {
    return this.repositoryMotorVehicleOwner.save(
      this.repositoryMotorVehicleOwner.create(createMotorVehicleOwnerDto),
    )
  }

  // create(createProfileDto: CreateUserDto) {
  //   return this.usersRepository.save(
  //     this.usersRepository.create(createProfileDto),
  //   );
  // }

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
