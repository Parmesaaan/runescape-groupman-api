import { Expose } from 'class-transformer'
import { IsDefined, IsString } from 'class-validator'

export class CreateUserNoteDto {
  @Expose()
  @IsString()
  @IsDefined()
  title!: string

  @Expose()
  @IsString()
  @IsDefined()
  contents!: string
}
