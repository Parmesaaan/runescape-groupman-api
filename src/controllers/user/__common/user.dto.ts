import { Expose } from 'class-transformer'
import { IsDefined, IsUUID } from 'class-validator'
import { User } from '../../../models'

export class UserIdDto {
  @Expose()
  @IsUUID()
  @IsDefined()
  userId!: string
}

export class UserResponseDto {
  id!: string
  username!: string
  createdAt!: Date
  updatedAt!: Date
  groups?: Array<string>
  notes?: Array<string>
  tasks?: Array<string>

  constructor(user: User) {
    this.id = user.id
    this.username = user.username
    this.createdAt = user.createdAt
    this.updatedAt = user.createdAt

    this.groups = user.groups?.map((group) => group.id)
    this.notes = user.notes?.map((note) => note.id)
    this.tasks = user.tasks?.map((task) => task.id)
  }
}
