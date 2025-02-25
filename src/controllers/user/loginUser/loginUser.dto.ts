import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";
import {UserResponseDto} from "../common";
import {User} from "../../../models";

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

export class LoginUserResponseDto extends UserResponseDto {
  token!: string

  constructor(user: User, token: string) {
    super(user)
    this.token = token
  }
}