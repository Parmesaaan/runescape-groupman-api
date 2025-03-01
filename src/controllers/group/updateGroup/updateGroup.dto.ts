import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class UpdateGroupDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string

  @Expose()
  @IsString()
  @IsOptional()
  ownerId?: string
}
