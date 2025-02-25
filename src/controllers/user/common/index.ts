import {Expose} from "class-transformer";
import {IsDefined, IsUUID} from "class-validator";

export class UserIdDTO {
    @Expose()
    @IsUUID()
    @IsDefined()
    userId!: string
}