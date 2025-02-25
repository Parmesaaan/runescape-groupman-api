import { Expose } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined, IsString } from "class-validator";

export class CreateGroupDTO {
  @Expose()
  @IsString()
  @IsDefined()
  name!: string;

  @Expose()
  @IsArray()
  @IsDefined()
  @ArrayNotEmpty()
  @IsString({ each: true })
  members!: Array<string>;
}