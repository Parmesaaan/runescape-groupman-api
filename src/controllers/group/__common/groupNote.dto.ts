import {Expose} from "class-transformer";
import {IsDefined, IsString} from "class-validator";

export class GroupNoteIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  groupId!: string

  @Expose()
  @IsString()
  @IsDefined()
  groupNoteId!: string
}

