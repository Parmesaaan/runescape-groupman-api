import { IsDefined, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'
import { Expose, Transform } from 'class-transformer'
import { Task, TaskType } from '../../../models'

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
  @MaxLength(24)
  title!: string

  @Expose()
  @IsString()
  @IsOptional()
  description?: string

  @Expose()
  @IsEnum(TaskType)
  @Transform(({ value }) => TaskType[value as keyof typeof TaskType] ?? value)
  @IsDefined()
  taskType!: TaskType
}

export class TaskResponseDto {
  id!: string
  title!: string
  description?: string
  taskType!: TaskType
  userId?: string
  lastCompleted?: Date
  createdAt!: Date
  updatedAt!: Date

  constructor(task: Task) {
    this.id = task.id
    this.title = task.title
    this.description = task.description
    this.taskType = task.taskType
    this.userId = task.user?.id
    this.lastCompleted = task.lastCompleted
    this.createdAt = task.createdAt
    this.updatedAt = task.updatedAt
  }
}
