import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MotorVehicle } from "../../motor-vehicles/entities/motor-vehicle.entity";

@Entity()
export class Examination extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  examinationDate: Date;

  @Column("decimal", { precision: 8 })
  mileage: number;

  @ManyToOne(() => MotorVehicle, (mv) => mv.examinations)
  motorVehicle: MotorVehicle;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
