import { Test, TestingModule } from "@nestjs/testing";
import { MotorVehicleService } from "./motor-vehicle.service";

describe("MotorVehicleService", () => {
  let service: MotorVehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorVehicleService],
    }).compile();

    service = module.get<MotorVehicleService>(MotorVehicleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
