import { Request, RequestHandler, Response } from 'express'
import { OperationResult } from '../../../types'
import { UserService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { UpdateUserDto } from './updateUser.dto'
import { User } from '../../../models'
import { UserIdDto, UserResponseDto } from '../__common'

export const updateUserController: RequestHandler = async (req: Request, res: Response) => {
  const userIdDto: UserIdDto = req.params as unknown as UserIdDto
  const request: UpdateUserDto = req.body as unknown as UpdateUserDto
  const result: OperationResult = await UserService.updateUser(userIdDto, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const user = result.success!.data as User
  const response: UserResponseDto = new UserResponseDto(user)
  return res.status(HttpStatusCode.Ok).json(response)
}
