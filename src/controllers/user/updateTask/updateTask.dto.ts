import { Expose, Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'
import { JoinRequestStatus, TaskType } from '../../../models'

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
  @IsEnum(TaskType)
  @Transform(({ value }) => TaskType[value as keyof typeof TaskType] ?? value)
  @IsOptional()
  taskType?: TaskType

  @Expose()
  @IsBoolean()
  @IsOptional()
  completed?: boolean
}