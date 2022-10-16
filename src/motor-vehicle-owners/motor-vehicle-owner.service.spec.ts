import { createMock } from "@golevelup/ts-jest";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  creteOwnerDto,
  ownerSeed,
  updateOwnerDto,
} from "../../test/unittest-mock-data";
import { MotorVehicleOwner } from "./entities/motor-vehicle-owner.entity";
import { MotorVehicleOwnerService } from "./motor-vehicle-owner.service";

describe("MotorVehicleOwnerService", () => {
  let service: MotorVehicleOwnerService;
  const ownerRepoMock = createMock<Repository<MotorVehicleOwner>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MotorVehicleOwnerService,
        {
          provide: getRepositoryToken(MotorVehicleOwner),
          useValue: ownerRepoMock,
        },
      ],
    }).compile();

    service = module.get<MotorVehicleOwnerService>(MotorVehicleOwnerService);
  });

  afterEach((): void => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create works", async () => {
    ownerRepoMock.save = jest.fn();
    ownerRepoMock.create = jest.fn();
    await service.create(creteOwnerDto);
    expect(ownerRepoMock.save).toBeCalled();
    expect(ownerRepoMock.create).toBeCalledWith(creteOwnerDto);
  });

  it("update works", async () => {
    ownerRepoMock.save = jest.fn();
    ownerRepoMock.create = jest.fn();
    const dummyID = "dummyUUID";
    await service.update(dummyID, updateOwnerDto);
    expect(ownerRepoMock.save).toBeCalled();
    expect(ownerRepoMock.create).toBeCalledWith({
      id: dummyID,
      ...updateOwnerDto,
    });
  });

  it("getById works", async () => {
    ownerRepoMock.findOneBy = jest.fn();
    const dummyID = "dummyID";
    await service.getById(dummyID);
    expect(ownerRepoMock.findOneBy).toBeCalledWith({ id: dummyID });
  });

  it("findOne works", async () => {
    ownerRepoMock.findOne = jest.fn();
    const dummyID = "dummyID";
    await service.findOne({ id: dummyID });
    expect(ownerRepoMock.findOne).toBeCalledWith({ where: { id: dummyID } });
  });

  it("delete works", async () => {
    ownerRepoMock.delete = jest.fn();
    const dummyID = "dummyID";
    await service.delete(dummyID);
    expect(ownerRepoMock.delete).toBeCalledWith(dummyID);
  });
});
