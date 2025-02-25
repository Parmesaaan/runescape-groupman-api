import { IsDefined, IsString, IsStrongPassword } from 'class-validator'
import { Expose } from 'class-transformer'

export class RegisterUserDto {
  @Expose()
  @IsString()
  @IsDefined()
  username!: string

  @Expose()
  @IsStrongPassword()
  @IsDefined()
  password!: string
}
