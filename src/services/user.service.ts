import { OperationResult } from '../types'
import { MembershipRepository, UserRepository } from '../config'
import { ChangePasswordDto, CredentialsDto, RefreshTokenDto, UpdateUserDto } from '../controllers'
import { generateTokenPair, isOpFailure, logger, opFailure, opSuccess, TokenPair, verifyRefreshToken } from '../utils'
import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import { PermissionLevel, User } from '../models'
import { UserProfileDto } from '../controllers/user/getUserProfile'

export class UserService {
  public static async signup(request: CredentialsDto): Promise<OperationResult> {
    const userExists = await UserRepository.exists({ where: { username: request.username } })
    if (userExists)
      return opFailure(HttpStatusCode.Forbidden, 'User with that username already exists')

    const user = new User()
    user.username = request.username
    user.password = await bcrypt.hash(request.password, 10)
    user.permissionLevel = PermissionLevel.USER

    const savedUser = await UserRepository.save(user)
    return opSuccess(savedUser)
  }

  public static async login(request: CredentialsDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { username: request.username } })
    if (!user)
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find user with username ${request.username}`,
      )

    const passwordMatch = await bcrypt.compare(request.password, user.password)
    if (!passwordMatch) return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)

    const tokenPair = generateTokenPair(user)
    return opSuccess({user, tokenPair})
  }

  public static async refreshToken(
    request: RefreshTokenDto,
  ): Promise<OperationResult> {
    const verifyTokenResult = verifyRefreshToken(request.refreshToken)
    if (isOpFailure(verifyTokenResult)) return verifyTokenResult
    const userId = (verifyTokenResult.success?.data as User).id

    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const tokenPair: TokenPair = generateTokenPair(user)
    return opSuccess(tokenPair)
  }

  public static async changePassword(
    userId: string,
    request: ChangePasswordDto,
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const passwordMatch = await bcrypt.compare(request.password, user.password)
    if (!passwordMatch) return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)

    user.password = await bcrypt.hash(request.password, 10)
    const updatedUser = await UserRepository.save(user)
    return opSuccess(updatedUser)
  }

  public static async updateUser(userId: string, request: UpdateUserDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    user.username = request.username ?? user.username

    const updatedUser = await UserRepository.save(user)
    return opSuccess(updatedUser)
  }

  public static async getUserProfile(userId: string) {
    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: [
        'tasks',
        'notes',
      ],
    })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const memberships = await MembershipRepository.find({
      where: { user: { id: userId } },
      relations: [
        'group',
        'group.notes',
        'group.notes.author',
        'group.memberships',
        'group.memberships.user',
      ],
    })

    logger.info(memberships[0])

    const userProfile = new UserProfileDto(user, memberships.map(m => m.group!))
    return opSuccess(userProfile)
  }
}
