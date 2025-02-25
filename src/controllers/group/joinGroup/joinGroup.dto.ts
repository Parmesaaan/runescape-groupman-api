import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class JoinGroupDTO {
  @Expose()
  @IsString()
  @IsDefined()
  user!: string;

  @Expose()
  @IsString()
  @IsDefined()
  group!: string;
}