import {Expose} from "class-transformer";
import {IsOptional, IsString} from "class-validator";

export class UpdateUserNoteDto {
  @Expose()
  @IsString()
  @IsOptional()
  title?: string

  @Expose()
  @IsString()
  @IsOptional()
  contents?: string
}