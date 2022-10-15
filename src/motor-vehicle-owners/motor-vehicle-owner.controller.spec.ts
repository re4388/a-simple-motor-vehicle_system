import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { creteOwnerDto, owner } from "../../test/unittest-mock-data";
import { MotorVehicleOwnerController } from "./motor-vehicle-owner.controller";
import { MotorVehicleOwnerService } from "./motor-vehicle-owner.service";

describe("MotorVehicleOwnerController", () => {
  let controller: MotorVehicleOwnerController;

  const ownerServiceMock = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorVehicleOwnerController],
      providers: [
        {
          provide: MotorVehicleOwnerService,
          useValue: ownerServiceMock,
        },
      ],
    }).compile();

    controller = module.get<MotorVehicleOwnerController>(
      MotorVehicleOwnerController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("create owner", async () => {
    ownerServiceMock.create = jest.fn().mockReturnValueOnce(owner)
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }
    await controller.create(<any>res, creteOwnerDto)
    expect(res.status).toBeCalledWith(HttpStatus.OK)
  });

  it("update owner", async () => {
    ownerServiceMock.update = jest.fn().mockReturnValueOnce(owner)
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }

    await controller.update('dummyID', <any>res, creteOwnerDto)
    expect(res.status).toBeCalledWith(HttpStatus.OK)
  });

  it("update owner with existed email", async () => {
    ownerServiceMock.update = jest.fn().mockReturnValueOnce(-1)
    const res = {
      status: jest.fn().mockImplementationOnce(
        () => {
          return {
            send: jest.fn()
          }
        }
      )
    }

    await controller.update('dummyID', <any>res, creteOwnerDto)
    expect(res.status).toBeCalledWith(HttpStatus.FORBIDDEN)
  });

  it("get by id", async () => {
    const dummyID = 'dummyID'
    await controller.findOne(dummyID);
    expect(ownerServiceMock.findOne).toBeCalledWith({ "id": dummyID })
  });

  it("remove by id", async () => {
    const dummyID = 'dummyID'
    await controller.remove(dummyID);
    expect(ownerServiceMock.delete).toBeCalledWith(dummyID)
  });
});
