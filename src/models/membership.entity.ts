import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import {Group} from "./group.entity";
import {User} from "./user.entity";

export enum Role {
  USER,
  ADMIN,
  OWNER
}

@Entity()
@Unique(['user', 'group'])
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_membership_id' })
  id!: string

  @Index()
  @ManyToOne(() => User, (user) => user.memberships, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: User

  @Index()
  @ManyToOne(() => Group, (group) => group.memberships, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group!: Group

  @Column({ type: 'enum', enum: Role, nullable: false, default: Role.USER })
  role!: Role

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}