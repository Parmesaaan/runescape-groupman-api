import {Expose} from 'class-transformer'
import {IsDefined, IsString} from 'class-validator'

export class CreateGroupDto {
  @Expose()
  @IsString()
  @IsDefined()
  name!: string
}
