import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Group } from './group.entity'

@Entity('group_note')
export class GroupNote {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_group_note_id' })
  id!: string

  @Column()
  title!: string

  @Column()
  contents!: string

  @ManyToOne(() => User, (user) => user.groupNotes, { nullable: true })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
  })
  author!: User | null

  @ManyToOne(() => Group, (group) => group.notes, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  group!: Group

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
