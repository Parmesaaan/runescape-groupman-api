import { Expose } from 'class-transformer'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateGroupDto {
  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(16)
  name?: string

  @Expose()
  @IsString()
  @IsOptional()
  ownerId?: string
}
