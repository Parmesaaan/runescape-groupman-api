import {Expose, Transform} from "class-transformer";
import {IsDefined, IsEnum, IsString} from "class-validator";
import {JoinRequestStatus} from "../../../models";

export class JoinRequestDto {
  @Expose()
  @IsString()
  @IsDefined()
  joinRequestId!: string

  @Expose()
  @IsEnum(JoinRequestStatus)
  @Transform(({ value }) => JoinRequestStatus[value as keyof typeof JoinRequestStatus] ?? value)
  @IsDefined()
  status!: JoinRequestStatus
}