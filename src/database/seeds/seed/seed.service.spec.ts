import { createMock } from "@golevelup/ts-jest";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
  createQueryRunner,
  exam1,
  owner,
  vehicle,
} from "../../../../test/unittest-mock-data";
import { Examination } from "../../../examinations/entities/examination.entity";
import { MotorVehicleOwner } from "../../../motor-vehicle-owners/entities/motor-vehicle-owner.entity";
import { MotorVehicle } from "../../../motor-vehicles/entities/motor-vehicle.entity";
import { SeedService } from "./seed.service";

describe("SeedService", () => {
  let service: SeedService;
  const examRepo = createMock<Repository<Examination>>();
  const motorRepo = createMock<Repository<MotorVehicle>>();
  const ownerRepo = createMock<Repository<MotorVehicleOwner>>();
  const dataSourceMock = createMock<DataSource>();
  const loggerMock = createMock<Logger>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: Logger,
          useValue: loggerMock,
        },
        {
          provide: getRepositoryToken(Examination),
          useValue: examRepo,
        },
        {
          provide: getRepositoryToken(MotorVehicleOwner),
          useValue: ownerRepo,
        },
        {
          provide: getRepositoryToken(MotorVehicle),
          useValue: motorRepo,
        },
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  afterEach((): void => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("run seed", async () => {
    motorRepo.count = jest.fn().mockResolvedValueOnce(0);
    ownerRepo.count = jest.fn().mockResolvedValueOnce(0);
    examRepo.count = jest.fn().mockResolvedValueOnce(0);
    dataSourceMock.createQueryRunner = jest
      .fn()
      .mockImplementation(() => createQueryRunner);
    ownerRepo.create = jest.fn().mockResolvedValueOnce(owner);
    motorRepo.create = jest.fn().mockResolvedValueOnce(vehicle);
    motorRepo.create = jest.fn().mockResolvedValueOnce(vehicle);
    examRepo.create = jest.fn().mockResolvedValueOnce(exam1);

    await service.run();

    expect(ownerRepo.save).toBeCalled();
    expect(motorRepo.save).toBeCalled();
    expect(examRepo.save).toBeCalled();
  });

  it("run seed with db already having data", async () => {
    motorRepo.count = jest.fn().mockResolvedValueOnce(1);
    await service.run();
    expect(dataSourceMock.createQueryRunner).not.toBeCalled();
  });
});
