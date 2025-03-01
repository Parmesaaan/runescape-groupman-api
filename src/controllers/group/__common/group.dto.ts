import {Expose} from 'class-transformer'
import {IsDefined, IsUUID} from 'class-validator'

export class GroupIdDto {
  @Expose()
  @IsUUID()
  @IsDefined()
  groupId!: string
}
