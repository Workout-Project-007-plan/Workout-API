import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Workout_plan } from "./workout_plans.entity";
import { Exercise } from "./exercises.entity";

@Entity("trains")
export class Train {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @OneToMany(() => Workout_plan, (workoutPlan) => workoutPlan.trains)
  workoutPlans: Workout_plan[];

  @OneToMany(() => Exercise, (exercise) => exercise.train)
  exercises: Exercise;
}
