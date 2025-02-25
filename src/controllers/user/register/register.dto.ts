import {IsDefined, IsString, IsStrongPassword} from "class-validator";
import {Expose} from "class-transformer";

export class RegisterDTO {
    @Expose()
    @IsString()
    @IsDefined()
    username!: string

    @Expose()
    @IsStrongPassword()
    @IsDefined()
    password!: string
}