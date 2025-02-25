import {Expose} from "class-transformer";
import {IsDefined, IsString} from "class-validator";

export class LeaveGroupDTO {
    @Expose()
    @IsString()
    @IsDefined()
    username!: string

    @Expose()
    @IsString()
    @IsDefined()
    group!: string
}