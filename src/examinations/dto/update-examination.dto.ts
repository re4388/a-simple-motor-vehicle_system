import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { CreateExaminationDto } from './create-examination.dto';

export class UpdateExaminationDto extends PartialType(CreateExaminationDto) {
  @ApiProperty({
    example: '2321',
    required: true,
  })
  @IsInt()
  @Min(0)
  @Max(1000000)
  @IsOptional()
  mileage?: number;

  @ApiProperty({
    example: '2022-01-01',
    required: true,
  })
  @Type(() => Date)
  @IsOptional()
  examinationDate?: Date;
}
