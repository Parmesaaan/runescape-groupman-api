import {Expose} from "class-transformer";
import {IsDefined, IsString, IsStrongPassword} from "class-validator";

export class LoginDTO {
    @Expose()
    @IsString()
    @IsDefined()
    username!: string

    @Expose()
    @IsString()
    @IsDefined()
    password!: string
}