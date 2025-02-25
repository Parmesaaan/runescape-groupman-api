import {Expose} from "class-transformer";
import {IsDefined, IsUUID} from "class-validator";

export class TaskIdDTO {
    @Expose()
    @IsUUID()
    @IsDefined()
    taskId!: string
}