import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Train } from "./trains.entity";

@Entity("Exercises")
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  reps: number;

  @Column()
  effort: number;

  @Column()
  load: number;

  @Column()
  rest: number;

  @Column()
  link: string;

  @ManyToOne(() => Train, (train) => train.exercises, { onDelete: "CASCADE" })
  train: Train;
}
