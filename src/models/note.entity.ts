import {
  Column,
  CreateDateColumn,
  Entity, Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Group } from "./group.entity";

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "PK_note_id" })
  id!: string;

  @Column()
  title!: string;

  @Column()
  contents!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @Index('IDX_note_user_id')
  @ManyToOne(() => User, (user) => user.notes, { nullable: true })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "FK_note_user",
  })
  user?: User;

  @Index('IDX_note_group_id')
  @ManyToOne(() => Group, (group) => group.notes, { nullable: true })
  @JoinColumn({
    name: "group_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "FK_note_group",
  })
  group?: Group;
}