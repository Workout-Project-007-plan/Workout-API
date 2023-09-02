import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Workout_plan } from "./workout_plans.entity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  height: number;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  weight_goal: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_adm: boolean;

  @CreateDateColumn({type:"date"})
  created_at: string;

  @UpdateDateColumn({type:"date"})
  updated_at: string;

  @DeleteDateColumn({ type:"date" })
  deleted_at: string | null;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @Column({ unique: true, nullable: true })
  password_reset_token: string;

  @Column({ nullable: true })
  password_reseted_at: string;

  @OneToMany(() => Workout_plan, (workoutPlan) => workoutPlan.user)
  workoutPlans: Workout_plan[];
}
