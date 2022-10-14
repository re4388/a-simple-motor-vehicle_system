import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseUUIDPipe } from '@nestjs/common';
import { MotorVehicleOwnerService } from './motor-vehicle-owner.service';
import { CreateMotorVehicleOwnerDto } from './dto/create-motor-vehicle-owner.dto';
import { UpdateMotorVehicleOwnerDto } from './dto/update-motor-vehicle-owner.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('motor-vehicle-owner')
@Controller({
  path: 'motor-vehicle-owner',
  version: '1',
})
export class MotorVehicleOwnerController {
  constructor(private readonly ownerService: MotorVehicleOwnerService) { }

  @Post()
  create(@Body() dto: CreateMotorVehicleOwnerDto) {
    return this.ownerService.create(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Res() res,
    @Body() dto: UpdateMotorVehicleOwnerDto) {
    const result = await this.ownerService.update(id, dto);

    if (result === -1) {
      return res.status(HttpStatus.FORBIDDEN)
        .send('emailAlreadyExists');
    }

    return res.status(HttpStatus.OK).send(result)
  }

  // validUUID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.ownerService.findOne({ id: id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.ownerService.delete(id);
  }


  // @Get()
  // findAll() {
  //   return this.motorVehicleOwnerService.findAll();
  // }

}
