import { Expose } from 'class-transformer'
import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CreateUserNoteDto {
  @Expose()
  @IsString()
  @IsDefined()
  @MaxLength(24)
  title!: string

  @Expose()
  @IsString()
  @IsDefined()
  contents!: string
}
