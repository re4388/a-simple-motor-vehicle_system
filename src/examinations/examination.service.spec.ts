import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  createExamDto,
  createQueryRunner,
  exam1,
  motorVehicleSeed1,
  owner,
  updateExamDto,
  vehicle,
} from '../../test/unittest-mock-data';
import { MotorVehicle } from '../motor-vehicles/entities/motor-vehicle.entity';
import { Examination } from './entities/examination.entity';
import { ExaminationService } from './examination.service';

describe('ExaminationService', () => {
  let service: ExaminationService;
  const examRepo = createMock<Repository<Examination>>();
  const motorRepo = createMock<Repository<MotorVehicle>>();
  const dataSourceMock = createMock<DataSource>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExaminationService,
        {
          provide: getRepositoryToken(Examination),
          useValue: examRepo,
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

    service = module.get<ExaminationService>(ExaminationService);
  });

  afterEach((): void => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create exam and can found vehicle', async () => {
    motorRepo.findOne = jest.fn().mockResolvedValue(vehicle);
    examRepo.create = jest.fn().mockResolvedValueOnce(exam1);
    dataSourceMock.createQueryRunner = jest
      .fn()
      .mockImplementation(() => createQueryRunner);

    await service.create(createExamDto);

    expect(motorRepo.findOne).toBeCalledWith({
      relations: ['examinations'],
      where: { id: createExamDto.motorVehicleId },
    });
    expect(examRepo.create).toBeCalledWith({
      examinationDate: exam1.examinationDate,
      mileage: exam1.mileage,
      motorVehicle: vehicle,
    });

    expect(examRepo.save).toBeCalledWith({
      examinationDate: exam1.examinationDate,
      mileage: exam1.mileage,
      motorVehicle: vehicle,
    });

    expect(motorRepo.save).toBeCalledWith(
      expect.objectContaining({
        motorVehicleType: motorVehicleSeed1.motorVehicleType,
        motorVehicleOwner: owner,
        manufactureDate: motorVehicleSeed1.manufactureDate,
      })
    );
  });

  it('create exam but can not find vehicle', async () => {
    motorRepo.findOne = jest.fn().mockResolvedValue(null);
    const res = await service.create(createExamDto);
    expect(res).toBe(-1);
    expect(motorRepo.findOne).toBeCalled();
  });

  it('update exam ', async () => {
    examRepo.save = jest.fn();
    examRepo.create = jest.fn();
    await service.update('dummyUUID', updateExamDto);
    expect(examRepo.save).toBeCalled();
    expect(examRepo.create).toBeCalled();
  });

  it('findOne works', async () => {
    examRepo.findOne = jest.fn();
    const dummyID = 'dummyID';
    await service.findOne({ id: dummyID });
    expect(examRepo.findOne).toBeCalledWith({ where: { id: dummyID } });
  });

  it('delete works', async () => {
    examRepo.delete = jest.fn();
    const dummyID = 'dummyID';
    await service.delete(dummyID);
    expect(examRepo.delete).toBeCalledWith(dummyID);
  });
});
