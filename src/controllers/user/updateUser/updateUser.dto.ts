import {Expose, Transform} from 'class-transformer'
import {IsDefined, IsEnum, IsOptional, IsString, IsStrongPassword} from 'class-validator'
import {PermissionLevel} from "../../../models";

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  username?: string

  @Expose()
  @IsString()
  @IsOptional()
  password?: string

  @Expose()
  @IsEnum(PermissionLevel)
  @IsOptional()
  @Transform(({ value }) => PermissionLevel[value as keyof typeof PermissionLevel])
  permissionLevel?: PermissionLevel
}
