import {IsDefined, IsEnum, IsOptional, IsString} from "class-validator";
import {Expose, Transform} from "class-transformer";
import {TaskType} from "../../../models";

export class TaskIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  taskId!: string
}

export class TaskDto {
  @Expose()
  @IsString()
  @IsDefined()
  title!: string

  @Expose()
  @IsString()
  @IsOptional()
  description?: string

  @Expose()
  @IsEnum(TaskType)
  @Transform(({value}) => TaskType[value as keyof typeof TaskType] ?? value)
  @IsDefined()
  taskType!: TaskType
}