import { Expose } from 'class-transformer'
import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CreateGroupNoteDto {
  @Expose()
  @IsString()
  @IsDefined()
  @MaxLength(16)
  title!: string

  @Expose()
  @IsString()
  @IsDefined()
  contents!: string
}
