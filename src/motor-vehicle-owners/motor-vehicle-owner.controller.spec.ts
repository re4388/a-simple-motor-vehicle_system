import { Test, TestingModule } from "@nestjs/testing";
import { MotorVehicleOwnerController } from "./motor-vehicle-owner.controller";
import { MotorVehicleOwnerService } from "./motor-vehicle-owner.service";

describe("MotorVehicleOwnerController", () => {
  let controller: MotorVehicleOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorVehicleOwnerController],
      providers: [MotorVehicleOwnerService],
    }).compile();

    controller = module.get<MotorVehicleOwnerController>(
      MotorVehicleOwnerController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
