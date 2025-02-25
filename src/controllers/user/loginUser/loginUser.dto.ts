import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class LoginUserDto {
  @Expose()
  @IsString()
  @IsDefined()
  username!: string;

  @Expose()
  @IsString()
  @IsDefined()
  password!: string;
}