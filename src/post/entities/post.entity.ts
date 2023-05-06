import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Index(["userId", "postId"], { unique: true })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column("varchar")
  userId: string;

  @Column("varchar")
  postId: string;

  @Column("varchar", { nullable: true })
  title: string | null;

  @Column("varchar", { nullable: true })
  body: string | null;

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

  @DeleteDateColumn({
    type: "timestamp",
    nullable: true,
  })
  removed_at: Date | null;
}
