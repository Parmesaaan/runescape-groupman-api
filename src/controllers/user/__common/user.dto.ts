import { Expose } from 'class-transformer'
import {IsDefined, IsUUID} from 'class-validator'

export class UserIdDto {
  @Expose()
  @IsUUID()
  @IsDefined()
  userId!: string
}
