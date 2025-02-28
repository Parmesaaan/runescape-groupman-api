import {Expose} from "class-transformer";
import {IsBoolean, IsDefined, IsString} from "class-validator";

export class JoinRequestDto {
  @Expose()
  @IsString()
  @IsDefined()
  joinRequestId!: string

  @Expose()
  @IsBoolean()
  @IsDefined()
  accept!: boolean
}