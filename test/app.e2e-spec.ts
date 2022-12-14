import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { APP_URL } from './utils/constants';

describe('AppController (e2e)', () => {
  const app = APP_URL;
  // console.log("app", app);

  it('/api/healthCheck', async function () {
    const response = await request(app).get('/api/healthCheck');
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.text).toEqual('Green light!');
  });

  it('CRUD for motor/owner/exam (POST/PATCH/GET/DELETE)', async () => {
    ////////////////// owner ///////////////////
    const fakeOwner = {
      name: 'e2eUser',
      email: 'e2eUser@example.com',
      address: 'Don Man Road No.21',
      city: 'Taichung City',
    };

    // test POST
    const ownerPostResponse = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(ownerPostResponse.status).toEqual(HttpStatus.OK);
    const newOwnerId = ownerPostResponse.body.id;
    // console.log("newOwnerId", newOwnerId);

    // test PATCH
    const newAddress = 'Don Man Road No.99';
    const ownerPatchResponse = await request(app)
      .patch(`/api/v1/motor-vehicle-owner/${newOwnerId}`)
      .send({ address: newAddress });

    expect(ownerPatchResponse.status).toEqual(HttpStatus.OK);

    fakeOwner.address = newAddress;

    // test GET
    const ownerGetResponse = await request(app).get(
      `/api/v1/motor-vehicle-owner/${newOwnerId}`
    );
    expect(ownerGetResponse.status).toEqual(HttpStatus.OK);
    expect(ownerGetResponse.body).toEqual({
      id: newOwnerId,
      ...fakeOwner,
    });

    ////////////////// motor-vehicle  ///////////////////
    const fakeVehicle = {
      licensePlateNumber: 'ZZZ-999',
      motorVehicleType: 'SmallLight',
      manufactureDate: '2021-09-09',
      motorVehicleOwnerId: newOwnerId,
    };

    // console.log("fakeVehicle", fakeVehicle);
    const motorPostRes = await request(app)
      .post('/api/v1/motor-vehicle')
      .send(fakeVehicle);

    // test POST
    expect(motorPostRes.status).toEqual(HttpStatus.OK);
    const newMotorId = motorPostRes.body.id;
    // console.log("newMotorId", newMotorId);

    // test PATCH
    const newLicensePlateNumber = 'ZZZ-000';
    const motorPatchRes = await request(app)
      .patch(`/api/v1/motor-vehicle/${newMotorId}`)
      .send({ licensePlateNumber: newLicensePlateNumber });

    expect(motorPatchRes.status).toEqual(HttpStatus.OK);

    fakeVehicle.licensePlateNumber = newLicensePlateNumber;

    // test GET
    const motorGetRes = await request(app).get(
      `/api/v1/motor-vehicle/${newMotorId}`
    );
    expect(motorGetRes.status).toEqual(HttpStatus.OK);
    expect(motorGetRes.body).toEqual(
      expect.objectContaining({
        id: newMotorId,
        licensePlateNumber: fakeVehicle.licensePlateNumber,
        manufactureDate: fakeVehicle.manufactureDate,
        motorVehicleType: fakeVehicle.motorVehicleType,
      })
    );

    ////////////////// exam ///////////////////
    const fakeExam = {
      mileage: 999,
      examinationDate: '2029-09-09',
      motorVehicleId: newMotorId,
    };

    // console.log("fakeExam", fakeExam);
    const examPostRes = await request(app)
      .post('/api/v1/examination')
      .send(fakeExam);

    // test POST
    expect(examPostRes.status).toEqual(HttpStatus.OK);
    const newExamId = examPostRes.body.id;
    // console.log("newExamId", newExamId);

    // test PATCH
    const newMileage = 111;
    const examPatchRes = await request(app)
      .patch(`/api/v1/examination/${newExamId}`)
      .send({ mileage: newMileage });

    expect(examPatchRes.status).toEqual(HttpStatus.OK);

    fakeExam.mileage = newMileage;

    // test GET
    const examGetRes = await request(app).get(
      `/api/v1/examination/${newExamId}`
    );
    expect(examGetRes.status).toEqual(HttpStatus.OK);
    expect(examGetRes.body).toEqual(
      expect.objectContaining({
        id: newExamId,
        mileage: fakeExam.mileage.toString(),
        examinationDate: fakeExam.examinationDate,
      })
    );

    await request(app)
      .delete(`/api/v1/examination/${newExamId}`)
      .then(async () => {
        await request(app).delete(`/api/v1/motor-vehicle/${newMotorId}`);
      })
      .then(async () => {
        await request(app).delete(`/api/v1/motor-vehicle-owner/${newOwnerId}`);
      });

    const examGetRes2 = await request(app).get(
      `/api/v1/examination/${newExamId}`
    );
    const ownerGetResponse2 = await request(app).get(
      `/api/v1/motor-vehicle-owner/${newOwnerId}`
    );
    const motorGetRes2 = await request(app).get(
      `/api/v1/motor-vehicle/${newMotorId}`
    );
    expect(examGetRes2.body).toEqual({});
    expect(ownerGetResponse2.body).toEqual({});
    expect(motorGetRes2.body).toEqual({});
  });

  it('/api/v1/motor-vehicle-owner (POST) BAD_REQUEST when no name field ', async () => {
    const fakeOwner = {
      email: 'e2eUser@example.com',
      address: 'Don Man Road No.21',
      city: 'Taichung City',
    };
    // test POST
    const response = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('name should not be empty');
  });

  it('/api/v1/motor-vehicle-owner (POST) BAD_REQUEST when no email field ', async () => {
    const fakeOwner = {
      name: 'e2eUser',
      address: 'Don Man Road No.21',
      city: 'Taichung City',
    };
    // test POST
    const response = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('email should not be empty');
  });

  it('/api/v1/motor-vehicle-owner (POST) BAD_REQUEST when no address field ', async () => {
    const fakeOwner = {
      name: 'e2eUser',
      email: 'abc@gmail.com',
      city: 'Taichung City',
    };
    // test POST
    const response = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('address should not be empty');
  });

  it('/api/v1/motor-vehicle-owner (POST) BAD_REQUEST when no city field ', async () => {
    const fakeOwner = {
      name: 'e2eUser',
      address: 'Don Man Road No.21',
      email: 'abc@gmail.com',
    };
    // test POST
    const response = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('city should not be empty');
  });

  it('/api/v1/motor-vehicle-owner (POST) BAD_REQUEST when email is not valid ', async () => {
    const fakeOwner = {
      name: 'e2eUser',
      address: 'Don Man Road No.21',
      email: 'this is not valid email',
      city: 'Taichung City',
    };
    // test POST
    const response = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message[0]).toEqual('email must be an email');
  });

  it('/api/v1/motor-vehicle-owner (POST) BAD_REQUEST when email is duplicated ', async () => {
    const fakeOwner = {
      name: 'e2eUserV2',
      address: 'Don Man Road No.21',
      email: 'aaa@gmail.com',
      city: 'Taichung City',
    };

    const response1 = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);
    const e2eUserV2Id = response1.body.id;

    const response2 = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);

    expect(response2.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response2.body.message[0]).toEqual('emailAlreadyExists');

    // clear up db
    await request(app).delete(`/api/v1/motor-vehicle-owner/${e2eUserV2Id}`);
  });

  it('/api/v1/motor-vehicle (POST) BAD_REQUEST when duplicated licensePlateNumber field ', async () => {
    const fakeOwner = {
      name: 'e2eUserV2',
      address: 'Don Man Road No.21',
      email: 'aaa@gmail.com',
      city: 'Taichung City',
    };

    const response0 = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);
    const e2eUserV2Id = response0.body.id;

    const fakeVehicle = {
      licensePlateNumber: 'QQQ-999',
      motorVehicleType: 'SmallLight',
      manufactureDate: '2021-09-09',
      motorVehicleOwnerId: e2eUserV2Id,
    };

    // console.log("fakeVehicle", fakeVehicle);
    const response1 = await request(app)
      .post('/api/v1/motor-vehicle')
      .send(fakeVehicle);

    const vehicleId = response1.body.id;

    const response2 = await request(app)
      .post('/api/v1/motor-vehicle')
      .send(fakeVehicle);

    expect(response2.body.message[0]).toEqual(
      'licensePlateNumberAlreadyExists'
    );

    // clear up
    await request(app)
      .delete(`/api/v1/motor-vehicle/${vehicleId}`)
      .then(async () => {
        await request(app).delete(`/api/v1/motor-vehicle-owner/${e2eUserV2Id}`);
      });
  });

  it('/api/v1/motor-vehicle (POST) BAD_REQUEST when UUID is invalid', async () => {
    const fakeOwner = {
      name: 'e2eUserV2',
      address: 'Don Man Road No.21',
      email: 'aaa@gmail.com',
      city: 'Taichung City',
    };

    const response0 = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);
    const e2eUserV2Id = response0.body.id;

    const inValidUUID = e2eUserV2Id + '-XX';
    const fakeVehicle = {
      licensePlateNumber: 'QQQ-999',
      motorVehicleType: 'SmallLight',
      manufactureDate: '2021-09-09',
      motorVehicleOwnerId: inValidUUID,
    };

    // console.log("fakeVehicle", fakeVehicle);
    const response1 = await request(app)
      .post('/api/v1/motor-vehicle')
      .send(fakeVehicle);

    expect(response1.body.message[0]).toEqual('mustBeValidUUID');

    // clear up
    await request(app).delete(`/api/v1/motor-vehicle-owner/${e2eUserV2Id}`);
  });

  it('/api/v1/examination (POST) BAD_REQUEST when mileage is invalid', async () => {
    const fakeOwner = {
      name: 'e2eUserV2',
      address: 'Don Man Road No.21',
      email: 'aaa@gmail.com',
      city: 'Taichung City',
    };

    const response0 = await request(app)
      .post('/api/v1/motor-vehicle-owner')
      .send(fakeOwner);
    const e2eUserV2Id = response0.body.id;

    const fakeVehicle = {
      licensePlateNumber: 'QQQ-999',
      motorVehicleType: 'SmallLight',
      manufactureDate: '2021-09-09',
      motorVehicleOwnerId: e2eUserV2Id,
    };

    // console.log("fakeVehicle", fakeVehicle);
    const response1 = await request(app)
      .post('/api/v1/motor-vehicle')
      .send(fakeVehicle);

    const vehicleId = response1.body.id;

    const fakeExam = {
      mileage: -3,
      examinationDate: '2029-09-09',
      motorVehicleId: vehicleId,
    };

    // console.log("fakeExam", fakeExam);
    const examPostRes = await request(app)
      .post('/api/v1/examination')
      .send(fakeExam);

    expect(examPostRes.body.message[0]).toEqual(
      'mileage must not be less than 0'
    );

    // clear up
    await request(app)
      .delete(`/api/v1/motor-vehicle/${vehicleId}`)
      .then(async () => {
        await request(app).delete(`/api/v1/motor-vehicle-owner/${e2eUserV2Id}`);
      });
  });
});
