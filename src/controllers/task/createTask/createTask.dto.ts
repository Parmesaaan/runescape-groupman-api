import {Expose,Transform} from "class-transformer";
import {IsDefined, IsEnum, IsOptional, IsString} from "class-validator";
import {TaskType} from "../../../models/task.entity";

export class CreateTaskDto {
    @Expose()
    @IsString()
    @IsDefined()
    title!: string;

    @Expose()
    @IsString()
    @IsOptional()
    description?: string;

    @Expose()
    @IsEnum(TaskType)
    @IsDefined()
    @Transform(({ value }) => TaskType[value as keyof typeof TaskType])
    taskType!: TaskType

    @Expose()
    @IsString()
    @IsOptional()
    group?: string;

    @Expose()
    @IsString()
    @IsOptional()
    user?: string;
}