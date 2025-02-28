import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { JoinRequest } from "./joinRequest.entity"
import { GroupNote } from "./groupNote.entity";

@Entity('group')
@Unique(['name'])
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_group_id' })
  id!: string

  @Column({ nullable: false })
  name!: string

  @ManyToOne(() => User, (user) => user.ownedGroups, { nullable: false })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner!: User

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    name: 'group_user',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users!: Array<User>

  @OneToMany(() => GroupNote, (groupNote) => groupNote.group)
  notes?: Array<GroupNote>

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.group)
  joinRequests?: Array<JoinRequest>

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
