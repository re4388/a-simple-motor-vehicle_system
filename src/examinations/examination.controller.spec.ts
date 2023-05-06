import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createExamDto,
  exam1,
  updateExamDto,
} from '../../test/unittest-mock-data';
import { ExaminationController } from './examination.controller';
import { ExaminationService } from './examination.service';

describe('ExaminationController', () => {
  let controller: ExaminationController;

  const serviceMock = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExaminationController],
      providers: [
        {
          provide: ExaminationService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ExaminationController>(ExaminationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create owner', async () => {
    serviceMock.create = jest.fn().mockReturnValueOnce(exam1);
    const res = {
      status: jest.fn().mockImplementationOnce(() => {
        return {
          send: jest.fn(),
        };
      }),
    };
    await controller.create(<any>res, createExamDto);
    expect(res.status).toBeCalledWith(HttpStatus.OK);
  });

  it('create owner when motor vehicle does not exit', async () => {
    serviceMock.create = jest.fn().mockReturnValueOnce(-1);
    const res = {
      status: jest.fn().mockImplementationOnce(() => {
        return {
          send: jest.fn(),
        };
      }),
    };
    await controller.create(<any>res, createExamDto);
    expect(res.status).toBeCalledWith(HttpStatus.NOT_FOUND);
  });

  it('update exam', async () => {
    serviceMock.update = jest.fn().mockReturnValueOnce(exam1);
    const res = {
      status: jest.fn().mockImplementationOnce(() => {
        return {
          send: jest.fn(),
        };
      }),
    };
    await controller.update('dummyID', <any>res, updateExamDto);
    expect(res.status).toBeCalledWith(HttpStatus.OK);
  });

  it('get by id', async () => {
    const dummyID = 'dummyID';
    await controller.findOne(dummyID);
    expect(serviceMock.findOne).toBeCalledWith({ id: dummyID });
  });

  it('remove by id', async () => {
    const dummyID = 'dummyID';
    await controller.remove(dummyID);
    expect(serviceMock.delete).toBeCalledWith(dummyID);
  });
});
