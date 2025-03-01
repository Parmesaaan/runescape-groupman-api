import { Expose } from 'class-transformer'
import { IsDefined, IsString } from 'class-validator'

export class UserNoteIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  userNoteId!: string
}
