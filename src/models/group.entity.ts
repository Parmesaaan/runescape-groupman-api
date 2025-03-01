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
import { JoinRequest } from "./joinRequest.entity"
import { GroupNote } from "./groupNote.entity";
import {Membership} from "./membership.entity";

@Entity('group')
@Unique(['name'])
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_group_id' })
  id!: string

  @Index()
  @Column({ nullable: false })
  name!: string

  @OneToMany(() => Membership, (membership) => membership.group)
  memberships?: Array<Membership>

  @OneToMany(() => GroupNote, (groupNote) => groupNote.group)
  notes?: Array<GroupNote>

  @OneToMany(() => JoinRequest, (joinRequest) => joinRequest.group)
  joinRequests?: Array<JoinRequest>

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
