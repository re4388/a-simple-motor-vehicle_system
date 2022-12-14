import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { validMotorVehicleType } from '../../common/enum';
import { Examination } from '../../examinations/entities/examination.entity';
import { MotorVehicleOwner } from '../../motor-vehicle-owners/entities/motor-vehicle-owner.entity';

@Entity()
export class MotorVehicle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 7, unique: true, nullable: false })
  licensePlateNumber: string;

  @Column({ type: 'enum', enum: validMotorVehicleType })
  motorVehicleType: string;

  @ManyToOne(() => MotorVehicleOwner, (owner) => owner.motorVehicles, {
    cascade: false, // default is false, make it explicit
  })
  motorVehicleOwner: MotorVehicleOwner;

  @OneToMany(() => Examination, (exam) => exam.motorVehicle)
  examinations: Examination[];

  @Column({ type: 'date' })
  manufactureDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
