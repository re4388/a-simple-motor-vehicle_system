import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { validMotorVehicleType } from '../../common/enum';

@Injectable()
@ValidatorConstraint({ name: 'isMotorVehicleTypeValid', async: true })
export class isMotorVehicleTypeValid implements ValidatorConstraintInterface {
  async validate(value: string) {
    const validType = validMotorVehicleType;
    if (validType.includes(value)) {
      // passed
      return true;
    } else {
      // show error
      return false;
    }
  }
}
