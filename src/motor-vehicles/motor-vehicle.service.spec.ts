import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { MotorVehicleService } from "./motor-vehicle.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MotorVehicleOwner } from "../motor-vehicle-owners/entities/motor-vehicle-owner.entity";
import { DataSource, Repository } from "typeorm";
import { MotorVehicle } from "./entities/motor-vehicle.entity";
import {
  createMotorDto,
  createQueryRunner,
  motorVehicleSeed1,
  owner,
  ownerSeed,
  updateMotorDto,
  vehicle,
} from "../../test/unittest-mock-data";

describe("MotorVehicleService", () => {
  let service: MotorVehicleService;
  const ownerRepoMock = createMock<Repository<MotorVehicleOwner>>();
  const vehicleRepoMock = createMock<Repository<MotorVehicle>>();
  const dataSourceMock = createMock<DataSource>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MotorVehicleService,
        {
          provide: getRepositoryToken(MotorVehicleOwner),
          useValue: ownerRepoMock,
        },
        {
          provide: getRepositoryToken(MotorVehicle),
          useValue: vehicleRepoMock,
        },
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<MotorVehicleService>(MotorVehicleService);
  });

  afterEach((): void => {
    jest.resetAllMocks();
    // jest.restoreAllMocks();
    // jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create motorVehicles and can found owner", async () => {
    ownerRepoMock.findOne = jest.fn().mockResolvedValue(owner);
    vehicleRepoMock.create = jest.fn().mockResolvedValueOnce(vehicle);
    dataSourceMock.createQueryRunner = jest
      .fn()
      .mockImplementation(() => createQueryRunner);

    await service.create(createMotorDto);

    expect(ownerRepoMock.findOne).toBeCalledWith({
      relations: ["motorVehicles"],
      where: { id: createMotorDto.motorVehicleOwnerId },
    });

    expect(vehicleRepoMock.create).toBeCalledWith({
      licensePlateNumber: motorVehicleSeed1.licensePlateNumber,
      manufactureDate: motorVehicleSeed1.manufactureDate,
      motorVehicleOwner: owner,
      motorVehicleType: motorVehicleSeed1.motorVehicleType,
    });

    expect(vehicleRepoMock.save).toBeCalledWith(
      expect.objectContaining({
        manufactureDate: motorVehicleSeed1.manufactureDate,
        motorVehicleOwner: owner,
        motorVehicleType: motorVehicleSeed1.motorVehicleType,
      })
    );

    expect(ownerRepoMock.save).toBeCalledWith(
      expect.objectContaining({
        name: ownerSeed.name,
        address: ownerSeed.address,
        city: ownerSeed.city,
        email: ownerSeed.email,
      })
    );
  });

  it("create motorVehicles but can not find owner", async () => {
    ownerRepoMock.findOne = jest.fn().mockResolvedValue(null);
    const res = await service.create(createMotorDto);
    expect(res).toBe(-1);
    expect(ownerRepoMock.findOne).toBeCalled();
  });

  it("update motorVehicles when no licensePlateNumber conflict", async () => {
    vehicleRepoMock.save = jest.fn();
    vehicleRepoMock.create = jest.fn();
    const dummyID = "dummyUUID";
    await service.update(dummyID, updateMotorDto);
    expect(vehicleRepoMock.save).toBeCalled();
    expect(vehicleRepoMock.create).toBeCalledWith({
      id: dummyID,
      ...updateMotorDto,
    });
  });

  // TODO add this later
  it.skip("no update motorVehicles when licensePlateNumber conflict", async () => {
    const createQueryBuilder: any = {
      where: () => createQueryBuilder,
      andWhere: () => createQueryBuilder,
      commitTransaction: () => createQueryBuilder,
      setParameters: () => createQueryBuilder,
      select: () => createQueryBuilder,
      getRawMany: () => Promise.resolve([[vehicle]]),
    };
    vehicleRepoMock.createQueryBuilder = jest
      .fn()
      .mockImplementationOnce(() => createQueryBuilder);
    await service.update("dummyUUID", updateMotorDto);
    expect(vehicleRepoMock.save).not.toHaveBeenCalled();
    expect(vehicleRepoMock.create).not.toHaveBeenCalled();
    // jest.resetAllMocks()
    // jest.restoreAllMocks();
    // jest.clearAllMocks();
  });

  it("findOne works", async () => {
    vehicleRepoMock.findOne = jest.fn();
    const dummyID = "dummyID";
    await service.findOne({ id: dummyID });
    expect(vehicleRepoMock.findOne).toBeCalledWith({ where: { id: dummyID } });
  });

  it("delete works", async () => {
    vehicleRepoMock.delete = jest.fn();
    const dummyID = "dummyID";
    await service.delete(dummyID);
    expect(vehicleRepoMock.delete).toBeCalledWith(dummyID);
  });
});
