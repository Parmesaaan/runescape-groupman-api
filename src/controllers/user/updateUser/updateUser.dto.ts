import { Expose } from 'class-transformer'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(16)
  username?: string
}
