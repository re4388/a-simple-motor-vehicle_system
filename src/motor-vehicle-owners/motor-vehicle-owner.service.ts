import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { CreateMotorVehicleOwnerDto } from './dto/create-motor-vehicle-owner.dto';
import { UpdateMotorVehicleOwnerDto } from './dto/update-motor-vehicle-owner.dto';
import { MotorVehicleOwner } from './entities/motor-vehicle-owner.entity';

@Injectable()
export class MotorVehicleOwnerService {
  constructor(
    @InjectRepository(MotorVehicleOwner)
    private ownerRepo: Repository<MotorVehicleOwner>
  ) {}

  create(createMotorVehicleOwnerDto: CreateMotorVehicleOwnerDto) {
    return this.ownerRepo.save(
      this.ownerRepo.create(createMotorVehicleOwnerDto)
    );
  }

  getById(id: string): Promise<MotorVehicleOwner> {
    return this.ownerRepo.findOneBy({ id });
  }

  async update(id: string, dto: UpdateMotorVehicleOwnerDto) {
    const result = await this.ownerRepo
      .createQueryBuilder()
      .where('email = :newEmail')
      .andWhere('id != :refId')
      .setParameters({ newEmail: dto.email, refId: id })
      .select('MotorVehicleOwner.id')
      .getRawMany();

    // console.log("result", result);

    // if we have not empty result arr, meaning we have conflict
    // (another user want to change to an mail which had been used)
    // we need to return -1 and show error msg
    if (result.length > 0) return -1;

    // and if return is null, continue to below procedure
    return this.ownerRepo.save(
      this.ownerRepo.create({
        id,
        ...dto,
      })
    );
  }

  async findOne(fields: EntityCondition<MotorVehicleOwner>) {
    return await this.ownerRepo.findOne({
      where: fields,
    });
  }

  async delete(id: string): Promise<void> {
    await this.ownerRepo.delete(id);
  }
}
