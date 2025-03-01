import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  username?: string
}
