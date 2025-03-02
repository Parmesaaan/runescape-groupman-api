import { Expose } from 'class-transformer'
import { IsDefined, IsString } from 'class-validator'
import { GroupNote } from '../../../models'

export class GroupNoteIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  groupId!: string

  @Expose()
  @IsString()
  @IsDefined()
  groupNoteId!: string
}

export class GroupNoteResponseDto {
  id!: string
  title!: string
  contents!: string
  authorId?: string
  groupId?: string
  createdAt!: Date
  updatedAt!: Date

  constructor(note: GroupNote) {
    this.id = note.id
    this.title = note.title
    this.contents = note.contents
    this.authorId = note.author?.id
    this.groupId = note.group?.id
    this.createdAt = note.createdAt
    this.updatedAt = note.updatedAt
  }
}
