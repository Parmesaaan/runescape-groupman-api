import { Expose } from "class-transformer";
import { IsDefined, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsDefined()
  username!: string;

  @Expose()
  @IsString()
  @IsDefined()
  password!: string;

  @Expose()
  @IsStrongPassword()
  @IsDefined()
  newPassword!: string;
}