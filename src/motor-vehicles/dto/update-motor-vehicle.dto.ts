import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Validate } from 'class-validator';
import { MotorVehicleTypeEnum } from '../../common/enum';
import { IsLicensePlateNumberValid } from '../../utils/validators/is-license-plate-number-valid';
import { isMotorVehicleTypeValid } from '../../utils/validators/is-vehicle-type-valid';
import { CreateMotorVehicleDto } from './create-motor-vehicle.dto';

export class UpdateMotorVehicleDto extends PartialType(CreateMotorVehicleDto) {
  @ApiProperty({
    description: 'License Plate Number',
    example: 'ABC-123',
    required: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Validate(IsLicensePlateNumberValid, {
    message: 'licensePlateNumberFormatIsInvalid',
  })
  @IsOptional()
  licensePlateNumber?: string;

  @ApiProperty({
    enum: MotorVehicleTypeEnum,
    enumName: 'MotorVehicleTypeEnum',
    description: 'Type of Motor Vehicle',
    example: 'SmallLight',
    required: true,
  })
  @Validate(isMotorVehicleTypeValid, {
    message: 'MotorVehicleTypeIsInvalid',
  })
  @IsOptional()
  motorVehicleType?: MotorVehicleTypeEnum;

  @ApiProperty({
    example: '2022-01-01',
    required: true,
  })
  @Type(() => Date)
  @IsOptional()
  manufactureDate?: Date;
}
