import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { MotorVehicleOwner } from "../motor-vehicle-owners/entities/motor-vehicle-owner.entity";
import { EntityCondition } from "../utils/types/entity-condition.type";
import { CreateMotorVehicleDto } from "./dto/create-motor-vehicle.dto";
import { UpdateMotorVehicleDto } from "./dto/update-motor-vehicle.dto";
import { MotorVehicle } from "./entities/motor-vehicle.entity";

@Injectable()
export class MotorVehicleService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(MotorVehicleOwner)
    private ownerRepo: Repository<MotorVehicleOwner>,

    @InjectRepository(MotorVehicle)
    private vehicleRepo: Repository<MotorVehicle>
  ) {}

  async create(dto: CreateMotorVehicleDto) {
    const owner = await this.ownerRepo.findOne({
      where: {
        id: dto.motorVehicleOwnerId,
      },
      relations: ["motorVehicles"],
    });

    if (!owner) return -1;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let motorVehicle: MotorVehicle;

    try {
      motorVehicle = this.vehicleRepo.create({
        licensePlateNumber: dto.licensePlateNumber,
        motorVehicleType: dto.motorVehicleType,
        manufactureDate: dto.manufactureDate,
        motorVehicleOwner: owner,
      });

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

  async update(id: string, dto: UpdateMotorVehicleDto) {
    const result = await this.vehicleRepo
      .createQueryBuilder()
      .where("MotorVehicle.licensePlateNumber = :newLicensePlateNumber")
      .andWhere("id != :refId")
      .setParameters({
        newLicensePlateNumber: dto.licensePlateNumber,
        refId: id,
      })
      .select("MotorVehicle.id")
      .getRawMany();

    console.log("result", result);

    // if we have not empty result arr, meaning we have conflict
    // (another user want to change to a licensePlateNumber
    // which had been used)
    // we need to return -1 and show error msg
    if (result.length > 0) return -1;

    return this.vehicleRepo.save(
      this.vehicleRepo.create({
        id,
        ...dto,
      })
    );
  }

  findOne(fields: EntityCondition<MotorVehicle>) {
    return this.vehicleRepo.findOne({
      where: fields,
    });
  }

  async delete(id: string): Promise<void> {
    await this.vehicleRepo.delete(id);
  }

  // findAll() {
  //   return `This action returns all motorVehicle`;
  // }
}
