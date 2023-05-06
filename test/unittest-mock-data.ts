import { MotorVehicleTypeEnum } from '../src/common/enum';
import { CreateExaminationDto } from '../src/examinations/dto/create-examination.dto';
import { UpdateExaminationDto } from '../src/examinations/dto/update-examination.dto';
import { Examination } from '../src/examinations/entities/examination.entity';
import { CreateMotorVehicleOwnerDto } from '../src/motor-vehicle-owners/dto/create-motor-vehicle-owner.dto';
import { UpdateMotorVehicleOwnerDto } from '../src/motor-vehicle-owners/dto/update-motor-vehicle-owner.dto';
import { MotorVehicleOwner } from '../src/motor-vehicle-owners/entities/motor-vehicle-owner.entity';
import { CreateMotorVehicleDto } from '../src/motor-vehicles/dto/create-motor-vehicle.dto';
import { UpdateMotorVehicleDto } from '../src/motor-vehicles/dto/update-motor-vehicle.dto';
import { MotorVehicle } from '../src/motor-vehicles/entities/motor-vehicle.entity';

const ownerSeed = {
  name: 'Ben Hu',
  email: 'ABC-123',
  address: 'home 23 road street 23',
  city: 'Tainan',
};

const motorVehicleSeed1 = {
  licensePlateNumber: 'AAA-111',
  manufactureDate: new Date('2022-01-01T00:30:00.000Z'),
  motorVehicleType: MotorVehicleTypeEnum.BigHeavy,
  motorVehicleOwnerId: '3bb84593-de0d-4901-b5af-d17e1d815ff4',
};

const examineSeed1 = {
  examinationDate: new Date('2022-01-01T00:30:00.000Z'),
  mileage: 123,
  motorVehicleId: '3bb84593-de0d-4901-b5af-d17e1d815ff2',
};
const examineSeed2 = {
  examinationDate: new Date('2022-02-01T00:30:00.000Z'),
  mileage: 321,
  motorVehicleId: '3bb84593-de0d-4901-b5af-d17e1d815ff1',
};

const owner = new MotorVehicleOwner();
owner.email = ownerSeed.email;
owner.address = ownerSeed.address;
owner.name = ownerSeed.name;
owner.city = ownerSeed.city;
owner.motorVehicles = [];

const vehicle = new MotorVehicle();
vehicle.licensePlateNumber;
vehicle.motorVehicleType = MotorVehicleTypeEnum.BigHeavy;
vehicle.manufactureDate = new Date('2022-01-01T00:30:00.000Z');
vehicle.motorVehicleOwner = owner;
vehicle.examinations = [];

const exam1 = new Examination();
exam1.examinationDate = examineSeed1.examinationDate;
exam1.mileage = examineSeed1.mileage;
exam1.motorVehicle = vehicle;

const exam2 = new Examination();
exam2.examinationDate = examineSeed2.examinationDate;
exam2.mileage = examineSeed2.mileage;
exam2.motorVehicle = vehicle;

const createQueryRunner: any = {
  connect: () => createQueryRunner,
  startTransaction: () => createQueryRunner,
  commitTransaction: () => createQueryRunner,
  rollbackTransaction: () => createQueryRunner,
  release: () => createQueryRunner,
};

const createMotorDto = new CreateMotorVehicleDto();
createMotorDto.licensePlateNumber = motorVehicleSeed1.licensePlateNumber;
createMotorDto.motorVehicleType = motorVehicleSeed1.motorVehicleType;
createMotorDto.manufactureDate = motorVehicleSeed1.manufactureDate;
createMotorDto.motorVehicleOwnerId = motorVehicleSeed1.motorVehicleOwnerId;

const updateMotorDto = new UpdateMotorVehicleDto();
updateMotorDto.licensePlateNumber = 'QAX-123';

const creteOwnerDto = new CreateMotorVehicleOwnerDto();
creteOwnerDto.name = ownerSeed.name;
creteOwnerDto.email = ownerSeed.email;
creteOwnerDto.address = ownerSeed.address;
creteOwnerDto.city = ownerSeed.city;

const updateOwnerDto = new UpdateMotorVehicleOwnerDto();
updateOwnerDto.city = 'New Taipei';

const createExamDto = new CreateExaminationDto();
createExamDto.examinationDate = examineSeed1.examinationDate;
createExamDto.mileage = examineSeed1.mileage;
createExamDto.motorVehicleId = examineSeed1.motorVehicleId;

const updateExamDto = new UpdateExaminationDto();
updateExamDto.mileage = 999;

export {
  motorVehicleSeed1,
  ownerSeed,
  examineSeed1,
  owner,
  vehicle,
  exam1,
  exam2,
  createQueryRunner,
  createMotorDto,
  updateMotorDto,
  creteOwnerDto,
  updateOwnerDto,
  createExamDto,
  updateExamDto,
};
