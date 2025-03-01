import {Expose} from "class-transformer";
import {IsDefined, IsString} from "class-validator";

export class JoinGroupDto {
  @Expose()
  @IsString()
  @IsDefined()
  groupId!: string
}