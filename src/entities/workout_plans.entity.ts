import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";

@Entity("workout_plans")
export class Workout_plans {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  plan_type: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  end_date: Date;

  @BeforeInsert()
  calculateEndDate() {
    const endDate = new Date(this.created_at);

    endDate.setDate(endDate.getDate() + 30);
    this.end_date = endDate;
  }
}
