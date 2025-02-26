import { OperationResult } from '../types'
import { JWT_SECRET, UserRepository } from '../config'
import {
  LoginUserDto,
  RegisterUserDto,
  SearchUsersDto,
  UpdateUserDto,
  UserIdDto,
} from '../controllers'
import { opFailure, opSuccess } from '../utils'
import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import { User } from '../models'
import jwt from 'jsonwebtoken'
import { In } from 'typeorm'

export class UserService {
  public static async createUser(request: RegisterUserDto): Promise<OperationResult> {
    if (await UserRepository.exists({ where: { username: request.username } })) {
      return opFailure(
        HttpStatusCode.Conflict,
        `User with username ${request.username} already exists`,
      )
    }

    const newUser = new User()
    newUser.username = request.username
    newUser.password = await bcrypt.hash(request.password, 10)

    const savedUser = await UserRepository.save(newUser)
    if (!savedUser) return opFailure()

    return opSuccess(savedUser)
  }

  public static async loginUser(request: LoginUserDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({
      where: { username: request.username },
      relations: ['groups', 'tasks', 'notes'],
    })
    if (!user)
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find user with username ${request.username}`,
      )

    const passwordMatch = await bcrypt.compare(request.password, user.password)
    if (!passwordMatch) return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    })

    return opSuccess({ user: user, token: token } as {
      user: User
      token: string
    })
  }

  static async updateUser(userIdDto: UserIdDto, request: UpdateUserDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userIdDto.userId } })
    if (!user)
      return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userIdDto.userId}`)

    const passwordMatch = await bcrypt.compare(request.password, user.password)
    if (!passwordMatch) return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)

    user.password = await bcrypt.hash(request.newPassword, 10)
    const updatedUser = await UserRepository.save(user)
    if (!updatedUser) return opFailure()
    return opSuccess(updatedUser)
  }

  public static async getUsers(request: SearchUsersDto): Promise<OperationResult> {
    const users = await UserRepository.find({
      where: { id: In(request.userIds) },
      relations: ['groups', 'tasks', 'notes'],
    })
    if (!users || !users.length)
      return opFailure(HttpStatusCode.NotFound, `Cannot find any users with provided ids`)
    return opSuccess(users)
  }
}
