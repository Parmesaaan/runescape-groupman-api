import { Expose } from 'class-transformer'
import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CreateGroupDto {
  @Expose()
  @IsString()
  @IsDefined()
  @MaxLength(16)
  name!: string
}
