import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MotorVehicle } from '../motor-vehicles/entities/motor-vehicle.entity';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { Examination } from './entities/examination.entity';

@Injectable()
export class ExaminationService {

  constructor(
    private dataSource: DataSource,

    @InjectRepository(Examination)
    private examRepo: Repository<Examination>,

    @InjectRepository(MotorVehicle)
    private motorRepo: Repository<MotorVehicle>,
  ) { }

  async create(dto: CreateExaminationDto) {


    const motorVehicle = await this.motorRepo.findOne(
      {
        where:
        {
          id: dto.motorVehicleId
        },
        relations: ['examinations']
      });


    if (!motorVehicle) return -1

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let exam: Examination

    try {

      exam = this.examRepo.create({
        examinationDate: dto.examinationDate,
        mileage: dto.mileage,
        motorVehicle: motorVehicle
      })

      await this.examRepo.save(exam);
      motorVehicle.examinations.push(exam);
      await this.motorRepo.save(motorVehicle);

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }


    return exam;

  }

  // findAll() {
  //   return `This action returns all examination`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} examination`;
  // }

  // update(id: number, updateExaminationDto: UpdateExaminationDto) {
  //   return `This action updates a #${id} examination`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} examination`;
  // }
}
