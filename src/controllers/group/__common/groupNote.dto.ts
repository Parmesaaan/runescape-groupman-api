import {Expose} from "class-transformer";
import {IsDefined, IsString} from "class-validator";

export class GroupNoteIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  groupNoteId!: string
}

export class GroupNoteDto {
  @Expose()
  @IsString()
  @IsDefined()
  title!: string

  @Expose()
  @IsString()
  @IsDefined()
  contents!: string
}