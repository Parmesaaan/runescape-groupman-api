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

  constructor(group: Group) {
    this.id = group.id
    this.name = group.name
    this.createdAt = group.createdAt
    this.updatedAt = group.updatedAt
  }
}
