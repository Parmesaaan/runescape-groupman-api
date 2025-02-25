import { Expose } from 'class-transformer'
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateNoteDto {
  @Expose()
  @IsString()
  @IsDefined()
  title!: string

  @Expose()
  @IsString()
  @IsDefined()
  content!: string

  @Expose()
  @IsUUID()
  @IsOptional()
  groupId?: string

  @Expose()
  @IsUUID()
  @IsOptional()
  userId?: string
}
