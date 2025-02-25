import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Note } from "./note.entity";
import {Task} from "./task.entity";

@Entity("group")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_group_id" })
  id!: string;

  @Column()
  @Unique("UQ_group_name", ["name"])
  name!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    name: "group_members",
    joinColumn: {
      name: "group_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "FK_group_members_group_id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "FK_group_members_user_id",
    },
  })
  users!: Array<User>;

  @OneToMany(() => Note, (note) => note.group) // User can have many notes
  notes!: Array<Note>;

  @OneToMany(() => Task, (task) => task.group)
  tasks!: Task[];
}