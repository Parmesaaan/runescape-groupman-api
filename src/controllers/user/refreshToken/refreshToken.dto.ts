import {Expose} from "class-transformer";
import {IsDefined, IsString} from "class-validator";

export class RefreshTokenDto {
    @Expose()
    @IsString()
    @IsDefined()
    refreshToken!: string
}
