import { Test, TestingModule } from '@nestjs/testing';
import { MotorVehicleController } from './motor-vehicle.controller';
import { MotorVehicleService } from './motor-vehicle.service';

describe('MotorVehicleController', () => {
  let controller: MotorVehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorVehicleController],
      providers: [MotorVehicleService],
    }).compile();

    controller = module.get<MotorVehicleController>(MotorVehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
