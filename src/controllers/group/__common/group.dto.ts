import { Expose } from 'class-transformer'
import { IsDefined, IsUUID } from 'class-validator'
import { Group } from '../../../models'

export class GroupIdDto {
  @Expose()
  @IsUUID()
  @IsDefined()
  groupId!: string
}

export class GroupResponseDto {
  id!: string
  name!: string
  createdAt!: Date
  updatedAt!: Date
  users?: Array<string>
  notes?: Array<string>
  tasks?: Array<string>

  constructor(group: Group) {
    this.id = group.id
    this.name = group.name
    this.createdAt = group.createdAt
    this.updatedAt = group.updatedAt

    this.users = group.users?.map((user) => user.id)
    this.notes = group.notes?.map((note) => note.id)
    this.tasks = group.tasks?.map((task) => task.id)
  }
}
