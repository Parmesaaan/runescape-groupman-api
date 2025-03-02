export class AuthResponseDto {
  token!: string
  refreshToken!: string

  constructor(token: string, refresh: string) {
    this.token = token
    this.refreshToken = refresh
  }
}
