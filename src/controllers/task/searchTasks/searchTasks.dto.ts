import { ArrayNotEmpty, IsArray, IsDefined, IsUUID } from 'class-validator'
import { Expose } from 'class-transformer'

export class SearchTasksDto {
  @Expose()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  @IsDefined()
  taskIds!: string[]
}
