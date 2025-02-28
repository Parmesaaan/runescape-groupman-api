import { Expose } from 'class-transformer'
import {IsDefined, IsString} from 'class-validator'

export class UserIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  userId!: string
}

export class UserReferenceDto extends UserIdDto {
  @Expose()
  @IsString()
  @IsDefined()
  username!: string
}