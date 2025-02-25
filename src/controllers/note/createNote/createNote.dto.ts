import { Expose } from "class-transformer";
import {
    IsDefined,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateNoteDto {
  @Expose()
  @IsString()
  @IsDefined()
  title!: string;

  @Expose()
  @IsString()
  @IsDefined()
  content!: string;

  @Expose()
  @IsString()
  @IsOptional()
  group?: string;

  @Expose()
  @IsString()
  @IsOptional()
  user?: string;
}