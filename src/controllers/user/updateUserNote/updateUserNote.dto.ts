import { Expose } from 'class-transformer'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateUserNoteDto {
  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(24)
  title?: string

  @Expose()
  @IsString()
  @IsOptional()
  contents?: string
}
