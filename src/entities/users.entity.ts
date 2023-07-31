import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { boolean } from "zod";
@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 3 })
  height: number;

  @Column({ length: 3 })
  age: number;

  @Column({ length: 3 })
  weight: number;

  @Column({ length: 3 })
  weight_goal: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_adm: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleted_at: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @Column({ unique: true, nullable: true })
  passwordResetToken: string;

  @Column({ type: "timestamp", nullable: true })
  psswordResetedAt: Date;
}
