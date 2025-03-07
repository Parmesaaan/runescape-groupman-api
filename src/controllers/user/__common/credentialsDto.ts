import { Expose } from 'class-transformer'
import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CredentialsDto {
  @Expose()
  @IsString()
  @IsDefined()
  @MaxLength(16)
  username!: string

  @Expose()
  @IsString()
  @IsDefined()
  password!: string
}
