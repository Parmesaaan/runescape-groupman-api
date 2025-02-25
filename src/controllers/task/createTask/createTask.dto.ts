import {Expose,Transform} from "class-transformer"
import {IsDefined, IsEnum, IsOptional, IsString, IsUUID} from "class-validator"
import {TaskType} from "../../../models/task.entity"

export class CreateTaskDto {
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
    @IsDefined()
    @Transform(({ value }) => TaskType[value as keyof typeof TaskType])
    taskType!: TaskType

    @Expose()
    @IsUUID()
    @IsOptional()
    groupId?: string

    @Expose()
    @IsUUID()
    @IsOptional()
    userId?: string
}