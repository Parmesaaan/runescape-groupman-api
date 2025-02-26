import { Expose } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsDefined, IsUUID } from 'class-validator'

export class SearchNotesDto {
  @Expose()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  @IsDefined()
  noteIds!: string[]
}
