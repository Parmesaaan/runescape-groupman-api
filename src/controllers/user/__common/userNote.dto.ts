import { Expose } from 'class-transformer'
import { IsDefined, IsString } from 'class-validator'
import { UserNote } from '../../../models'

export class UserNoteIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  userNoteId!: string
}

export class UserNoteResponseDto {
  id!: string
  title!: string
  contents!: string
  userId?: string
  createdAt!: Date
  updatedAt!: Date

  constructor(note: UserNote) {
    this.id = note.id
    this.title = note.title
    this.contents = note.contents
    this.userId = note.user?.id
    this.createdAt = note.createdAt
    this.updatedAt = note.updatedAt
  }
}
