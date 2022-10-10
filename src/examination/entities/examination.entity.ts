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
import { MotorVehicleOwner } from '../../motor-vehicle-owner/entities/motor-vehicle-owner.entity';
import { MotorVehicle } from '../../motor-vehicle/entities/motor-vehicle.entity';

@Entity()
export class Examination extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('time')
    ExaminationDate: Date;

    @Column('decimal', { precision: 8 })
    mileage: number;


    @ManyToOne(() => MotorVehicle, (motorVehicle) => motorVehicle.examinations)
    motorVehicle: MotorVehicle;

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