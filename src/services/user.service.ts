import {OperationResult} from '../types'
import {UserRepository} from '../config'
import {ChangePasswordDto, LoginDto, RefreshTokenDto, UpdateUserDto} from '../controllers'
import {generateTokenPair, isOpFailure, opFailure, opSuccess, TokenPair, verifyRefreshToken} from '../utils'
import {HttpStatusCode} from 'axios'
import bcrypt from 'bcrypt'

export class UserService {
  public static async login(credentials: LoginDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { username: credentials.username } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with username ${credentials.username}`)

    const passwordMatch = await bcrypt.compare(credentials.password, user.password)
    if (!passwordMatch) return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)

    const tokenPair: TokenPair = generateTokenPair(user)
    return opSuccess(tokenPair)
  }

  public static async refreshToken(userId: string, request: RefreshTokenDto): Promise<OperationResult> {
    const verifyTokenResult = verifyRefreshToken(request.refreshToken)
    if (isOpFailure(verifyTokenResult)) return verifyTokenResult

    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const tokenPair: TokenPair = generateTokenPair(user)
    return opSuccess(tokenPair)
  }

  public static async changePassword(userId: string, request: ChangePasswordDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const passwordMatch = await bcrypt.compare(request.password, user.password)
    if (!passwordMatch) return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)

    user.password = await bcrypt.hash(request.password, 10)
    const updatedUser = await UserRepository.save(user)
    return opSuccess(updatedUser)
  }

  static async updateUser(userId: string, request: UpdateUserDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    if (request.username) user.username = request.username

    const updatedUser = await UserRepository.save(user)
    return opSuccess(updatedUser)
  }
}
