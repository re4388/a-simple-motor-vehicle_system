import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { MotorVehicleTypeEnum } from '../../motor-vehicles/dto/create-motor-vehicle.dto';


@Injectable()
@ValidatorConstraint({ name: 'isMotorVehicleTypeValid', async: true })
export class isMotorVehicleTypeValid implements ValidatorConstraintInterface {
    async validate(value: string) {
        const validType = [
            MotorVehicleTypeEnum.SmallLight.toString(),
            MotorVehicleTypeEnum.RegularLight.toString(),
            MotorVehicleTypeEnum.RegularHeavy.toString(),
            MotorVehicleTypeEnum.BigHeavy.toString(),
        ]
        if (validType.includes(value)) {
            // passed
            return true;
        } else {
            // show error
            return false
        }
    }
}