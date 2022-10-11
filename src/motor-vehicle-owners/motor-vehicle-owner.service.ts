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
    private repoOwner: Repository<MotorVehicleOwner>
  ) { }

  // const resultObj = await this.motorVehicleService.create(
  //   motorVehicleOwner,
  // );

  create(createMotorVehicleOwnerDto: CreateMotorVehicleOwnerDto) {
    return this.repoOwner.save(
      this.repoOwner.create(createMotorVehicleOwnerDto),
    )
  }

  getById(id: string): Promise<MotorVehicleOwner> {
    return this.repoOwner.findOneBy({ id });
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
