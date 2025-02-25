import { Expose } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsDefined, IsString } from "class-validator"

export class CreateGroupDto {
  @Expose()
  @IsString()
  @IsDefined()
  name!: string

  @Expose()
  @IsArray()
  @IsDefined()
  @ArrayNotEmpty()
  @IsString({ each: true })
  users!: Array<string>
}