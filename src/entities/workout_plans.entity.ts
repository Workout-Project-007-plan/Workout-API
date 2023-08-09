import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  ManyToOne,
} from "typeorm";
import { User } from "./users.entity";
import { Train } from "./trains.entity";

@Entity("workout_plans")
export class Workout_plan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  plan_type: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column({ nullable: true })
  end_date: Date;

  @BeforeInsert()
  calculateEndDate() {
    const endDate = new Date(this.created_at);

    endDate.setDate(endDate.getDate() + 30);
    this.end_date = endDate;
  }
  @ManyToOne(() => User, (user) => user.workoutPlans, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Train, (train) => train.workoutPlans, {
    onDelete: "CASCADE",
  })
  trains: Train;
}
