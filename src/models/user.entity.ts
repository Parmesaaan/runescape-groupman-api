import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Task } from './task.entity'
import {JoinRequest} from "./joinRequest.entity"
import {UserNote} from "./userNote.entity";
import {Membership} from "./membership.entity";

export enum PermissionLevel {
  NONE,
  USER,
  ADMIN,
}

@Entity('user')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id!: string

  @Index()
  @Column({ nullable: false })
  username!: string

  @Column({ name: 'password_hash', nullable: false  })
  password!: string

  @Column({ type: 'enum', enum: PermissionLevel, name: 'permission_level', nullable: false  })
  permissionLevel!: PermissionLevel

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships?: Array<Membership>

  @OneToMany(() => UserNote, (userNote) => userNote.user)
  notes?: Array<UserNote>

  @OneToMany(() => Task, (task) => task.user)
  tasks?: Array<Task>

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.user)
  joinRequests?: Array<JoinRequest>

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
