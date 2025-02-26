import { ArrayNotEmpty, IsArray, IsDefined, IsUUID } from 'class-validator'
import { Expose } from 'class-transformer'

export class GetUsersDto {
  @Expose()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  @IsDefined()
  userIds!: string[]
}
