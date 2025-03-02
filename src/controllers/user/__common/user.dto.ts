import { Expose } from 'class-transformer'
import { IsDefined, IsString } from 'class-validator'
import { User } from '../../../models'

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

export class UserResponseDto {
  id!: string
  username!: string
  createdAt!: Date
  updatedAt!: Date

  constructor(user: User) {
    this.id = user.id
    this.username = user.username
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
