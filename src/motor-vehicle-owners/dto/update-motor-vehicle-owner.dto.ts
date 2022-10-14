import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { CreateMotorVehicleOwnerDto } from './create-motor-vehicle-owner.dto';

export class UpdateMotorVehicleOwnerDto extends PartialType(CreateMotorVehicleOwnerDto) {
    @ApiProperty({
        example: 'Ben Hu',
        required: true,
    })
    @IsNotEmpty()
    @IsOptional()
    name?: string;


    // @Validate(IsNotExist, ["MotorVehicleOwner"], {
    //     message: 'emailAlreadyExists',
    // })
    @ApiProperty({
        example: 'test1@example.com',
        required: true,
    })
    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        example: 'Don Man Road No.21',
        required: true,
    })
    @IsOptional()
    address?: string;

    @ApiProperty({
        example: 'New Taipei City',
        required: true,
    })
    @IsOptional()
    city?: string;
}
