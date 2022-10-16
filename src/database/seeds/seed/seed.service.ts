import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Examination } from "../../../examinations/entities/examination.entity";
import { DataSource } from "typeorm";
import { MotorVehicle } from "../../../motor-vehicles/entities/motor-vehicle.entity";
import { MotorVehicleOwner } from "../../../motor-vehicle-owners/entities/motor-vehicle-owner.entity";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Examination)
    private examRepo: Repository<Examination>,

    @InjectRepository(MotorVehicle)
    private vehicleRepo: Repository<MotorVehicle>,

    @InjectRepository(MotorVehicleOwner)
    private ownerRepo: Repository<MotorVehicleOwner>,

    private dataSource: DataSource
  ) { }

  async run() {
    const countExam = await this.examRepo.count();
    const countVehicle = await this.vehicleRepo.count();
    console.log("countVehicle", countVehicle);
    const countOwner = await this.ownerRepo.count();

    if (countExam !== 0 || countVehicle !== 0 || countOwner !== 0) {
      console.log("The db is not empty, initial seeding is abort");
      return;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const motorVehicleOwner = this.ownerRepo.create({
        name: "Ben Hu",
        address: "Chung Shin Road, Apple street, No.3",
        email: "ben_hu@abc.com",
        city: "Tainan",
      });

      await this.ownerRepo.save(motorVehicleOwner);

      const motorVehicle0 = this.vehicleRepo.create({
        licensePlateNumber: "ABC-123",
        motorVehicleType: "SmallLight",
        manufactureDate: new Date("2022-01-01T00:30:00.000Z"),
        motorVehicleOwner: motorVehicleOwner,
      });

      const motorVehicle1 = this.vehicleRepo.create({
        licensePlateNumber: "XYZ-987",
        motorVehicleType: "BigHeavy",
        manufactureDate: new Date("2022-01-02T00:30:00.000Z"),
        motorVehicleOwner: motorVehicleOwner,
      });

      await this.vehicleRepo.save([motorVehicle0, motorVehicle1]);

      const examination00 = this.examRepo.create({
        examinationDate: new Date("2022-02-01T00:30:00.000Z"),
        mileage: 100,
        motorVehicle: motorVehicle0,
      });
      const examination01 = this.examRepo.create({
        examinationDate: new Date("2022-03-01T00:30:00.000Z"),
        mileage: 200,
        motorVehicle: motorVehicle0,
      });
      const examination10 = this.examRepo.create({
        examinationDate: new Date("2022-04-01T00:30:00.000Z"),
        mileage: 1000,
        motorVehicle: motorVehicle1,
      });
      const examination11 = this.examRepo.create({
        examinationDate: new Date("2022-05-01T00:30:00.000Z"),
        mileage: 2000,
        motorVehicle: motorVehicle1,
      });

      await this.examRepo.save([
        examination00,
        examination01,
        examination10,
        examination11,
      ]);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      console.log("finished seeding");
    }
  }
}
