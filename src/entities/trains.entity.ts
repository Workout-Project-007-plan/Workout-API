import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Workout_plans } from "./workout_plans.entity";

@Entity("trains")
export class Trains {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @OneToMany(() => Workout_plans, (workoutPlans) => workoutPlans.trains)
  workoutPlans: Workout_plans[]
}
