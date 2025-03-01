import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {User} from './user.entity'

@Entity('user_note')
export class UserNote {
  @PrimaryGeneratedColumn('uuid', {primaryKeyConstraintName: 'PK_user_note_id'})
  id!: string

  @Column()
  title!: string

  @Column()
  contents!: string

  @ManyToOne(() => User, (user) => user.notes, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: User

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt!: Date
}
