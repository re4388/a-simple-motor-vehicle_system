import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { IsNotExist } from "../../utils/validators/is-not-exists.validator";
import { MotorVehicleOwner } from "../entities/motor-vehicle-owner.entity";


export class CreateMotorVehicleOwnerDto {

    @ApiProperty({ example: 'Ben Hu' })
    @IsNotEmpty()
    name: string;


    @ApiProperty({ example: 'test1@example.com' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    @Validate(IsNotExist, ["MotorVehicleOwner"], {
        message: 'emailAlreadyExists',
    })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Don Man Road No.21' })
    address: string;

    @ApiProperty({ example: 'New Taipei City' })
    city: string;
}
