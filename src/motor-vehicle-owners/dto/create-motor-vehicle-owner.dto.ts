export class CreateMotorVehicleOwnerDto {}


// import { ApiProperty } from "@nestjs/swagger";
// import { Transform } from "class-transformer";
// import { IsNotEmpty, Validate } from "class-validator";




// export class CreateMotorVehicleOwnerDto {
//     @ApiProperty({ example: 'test1@example.com' })
//     @Transform(({ value }) => value?.toLowerCase().trim())
//     @IsNotEmpty()
//     @Validate(IsNotExist, ['User'], {
//       message: 'emailAlreadyExists',
//     })
//     @IsEmail()
//     email: string | null;
  
//     @ApiProperty()
//     @MinLength(6)
//     password?: string;
  
//     provider?: string;
  
//     socialId?: string | null;
  
//     @ApiProperty({ example: 'John' })
//     @IsNotEmpty()
//     firstName: string | null;
  
//     @ApiProperty({ example: 'Doe' })
//     @IsNotEmpty()
//     lastName: string | null;
  
//     @ApiProperty({ type: () => FileEntity })
//     @IsOptional()
//     @Validate(IsExist, ['FileEntity', 'id'], {
//       message: 'imageNotExists',
//     })
//     photo?: FileEntity | null;
  
//     @ApiProperty({ type: Role })
//     @Validate(IsExist, ['Role', 'id'], {
//       message: 'roleNotExists',
//     })
//     role?: Role | null;
  
//     @ApiProperty({ type: Status })
//     @Validate(IsExist, ['Status', 'id'], {
//       message: 'statusNotExists',
//     })
//     status?: Status;
  
//     hash?: string | null;
//   }
