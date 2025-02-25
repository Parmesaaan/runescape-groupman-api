import {Expose} from "class-transformer"
import {IsBoolean, IsOptional, IsString} from "class-validator"

export class UpdateTaskDto {
    @Expose()
    @IsBoolean()
    @IsOptional()
    completed?: boolean

    @Expose()
    @IsString()
    @IsOptional()
    title?: string

    @Expose()
    @IsString()
    @IsOptional()
    description?: string
}