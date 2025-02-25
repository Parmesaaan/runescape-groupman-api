import { Expose } from 'class-transformer'
import { IsDefined, IsUUID } from 'class-validator'
import { Task, TaskType } from '../../../models/task.entity'

export class TaskIdDto {
  @Expose()
  @IsUUID()
  @IsDefined()
  taskId!: string
}

export class TaskResponseDto {
  id!: string
  title!: string
  description?: string
  taskType!: TaskType
  lastCompleted?: Date
  userId?: string
  groupId?: string
  createdAt!: Date
  updatedAt!: Date

  constructor(task: Task) {
    this.id = task.id
    this.title = task.title
    this.description = task.description
    this.taskType = task.taskType
    this.lastCompleted = task.lastCompleted
    this.createdAt = task.createdAt
    this.updatedAt = task.updatedAt

    this.userId = task.user?.id
    this.groupId = task.group?.id
  }
}
