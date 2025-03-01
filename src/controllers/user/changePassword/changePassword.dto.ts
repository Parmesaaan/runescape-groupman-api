import { Expose } from 'class-transformer'
import { IsDefined, IsString, IsStrongPassword } from 'class-validator'

export class ChangePasswordDto {
  @Expose()
  @IsString()
  @IsDefined()
  password!: string

  @Expose()
  @IsStrongPassword()
  @IsDefined()
  newPassword!: string
}
