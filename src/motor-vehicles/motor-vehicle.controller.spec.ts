import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { createMotorDto, updateMotorDto, vehicle } from "../../test/unittest-mock-data";
import { MotorVehicleController } from "./motor-vehicle.controller";
import { MotorVehicleService } from "./motor-vehicle.service";

describe("MotorVehicleController", () => {
  let controller: MotorVehicleController;

  const motorVehicleServiceMock = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorVehicleController],
      providers: [
        {
          provide: MotorVehicleService,
          useValue: motorVehicleServiceMock,
        },
      ],
    }).compile();

    controller = module.get<MotorVehicleController>(MotorVehicleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("create motorVehicle", async () => {
    motorVehicleServiceMock.create = jest.fn().mockResolvedValue(vehicle);
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }
    await controller.create(<any>res, createMotorDto);
    expect(motorVehicleServiceMock.create).toBeCalledWith(createMotorDto)
    expect(res.status).toBeCalledWith(HttpStatus.OK)
  });

  it("create motorVehicle when owner does not exist", async () => {
    motorVehicleServiceMock.create = jest.fn().mockResolvedValue(-1);
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }
    await controller.create(<any>res, createMotorDto);
    expect(motorVehicleServiceMock.create).toBeCalledWith(createMotorDto)
    expect(res.status).toBeCalledWith(HttpStatus.NOT_FOUND)
  });

  it("update motorVehicle when owner does not exist", async () => {
    motorVehicleServiceMock.update = jest.fn().mockResolvedValue(-1);
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }
    const dummyID = 'dummyID'
    await controller.update(dummyID, <any>res, updateMotorDto);
    expect(motorVehicleServiceMock.update).toBeCalledWith(dummyID, {
      "licensePlateNumber": updateMotorDto.licensePlateNumber
    })
    expect(res.status).toBeCalledWith(HttpStatus.FORBIDDEN)
  });

  it("update motorVehicle when owner exist", async () => {
    motorVehicleServiceMock.update = jest.fn().mockResolvedValue(vehicle);
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }
    const dummyID = 'dummyID'
    await controller.update(dummyID, <any>res, updateMotorDto);
    expect(motorVehicleServiceMock.update).toBeCalledWith(dummyID, {
      "licensePlateNumber": updateMotorDto.licensePlateNumber
    })
    expect(res.status).toBeCalledWith(HttpStatus.OK)
  });

  it("get by id", async () => {
    const dummyID = 'dummyID'
    await controller.findOne(dummyID);
    expect(motorVehicleServiceMock.findOne).toBeCalledWith({ "id": dummyID })
  });

  it("remove by id", async () => {
    const dummyID = 'dummyID'
    await controller.remove(dummyID);
    expect(motorVehicleServiceMock.delete).toBeCalledWith(dummyID)
  });
});
