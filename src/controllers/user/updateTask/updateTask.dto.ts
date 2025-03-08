import { Expose } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateTaskDto {
  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(24)
  title?: string

  @Expose()
  @IsString()
  @IsOptional()
  description?: string

  @Expose()
  @IsBoolean()
  @IsOptional()
  completed?: boolean
}