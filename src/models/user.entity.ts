import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Group } from "./group.entity";
import { Note } from "./note.entity";
import {Task} from "./task.entity";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_user_id" })
  id!: string;

  @Column()
  @Unique("UQ_user_username", ["username"])
  username!: string;

  @Column({ name: "password_hash" })
  password!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToMany(() => Group, (group) => group.users)
  groups!: Array<Group>;

  @OneToMany(() => Note, (note) => note.user) // User can have many notes
  notes!: Array<Note>;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}