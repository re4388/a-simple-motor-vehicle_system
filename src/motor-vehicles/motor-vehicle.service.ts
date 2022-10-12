import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MotorVehicleOwner } from '../motor-vehicle-owners/entities/motor-vehicle-owner.entity';
import { CreateMotorVehicleDto } from './dto/create-motor-vehicle.dto';
import { MotorVehicle } from './entities/motor-vehicle.entity';

@Injectable()
export class MotorVehicleService {
  constructor(

    private dataSource: DataSource,

    @InjectRepository(MotorVehicleOwner)
    private ownerRepo: Repository<MotorVehicleOwner>,


    @InjectRepository(MotorVehicle)
    private vehicleRepo: Repository<MotorVehicle>,
  ) { }

  async create(dto: CreateMotorVehicleDto) {

    const owner = await this.ownerRepo.findOne(
      {
        where:
        {
          id: dto.motorVehicleOwnerId
        },
        relations: ['motorVehicles']
      });


    if (!owner) return -1

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let motorVehicle: MotorVehicle

    try {
      motorVehicle = this.vehicleRepo.create({
        licensePlateNumber: dto.licensePlateNumber,
        motorVehicleType: dto.motorVehicleType,
        manufactureDate: dto.manufactureDate,
        motorVehicleOwner: owner
      })

      await this.vehicleRepo.save(motorVehicle);
      owner.motorVehicles.push(motorVehicle);
      await this.ownerRepo.save(owner);

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return motorVehicle;
  }

  getById(id: string): Promise<MotorVehicle> {
    return this.vehicleRepo.findOneBy({ id });
  }

  // findAll() {
  //   return `This action returns all motorVehicle`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} motorVehicle`;
  // }

  // update(id: number, updateMotorVehicleDto: UpdateMotorVehicleDto) {
  //   return `This action updates a #${id} motorVehicle`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} motorVehicle`;
  // }
}
