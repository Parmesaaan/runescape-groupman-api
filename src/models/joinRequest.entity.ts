import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Group } from './group.entity'
import { User } from './user.entity'

export enum JoinRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
}

@Entity('join_request')
export class JoinRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_join_request_id' })
  id!: string

  @Index()
  @ManyToOne(() => User, (user) => user.joinRequests, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: User

  @Index()
  @ManyToOne(() => Group, (group) => group.joinRequests, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group!: Group

  @Column({ type: 'enum', enum: JoinRequestStatus, nullable: false })
  status!: JoinRequestStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
