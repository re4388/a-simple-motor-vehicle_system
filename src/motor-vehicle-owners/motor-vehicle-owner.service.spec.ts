import { Test, TestingModule } from "@nestjs/testing";
import { MotorVehicleOwnerService } from "./motor-vehicle-owner.service";

describe("MotorVehicleOwnerService", () => {
  let service: MotorVehicleOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorVehicleOwnerService],
    }).compile();

    service = module.get<MotorVehicleOwnerService>(MotorVehicleOwnerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
