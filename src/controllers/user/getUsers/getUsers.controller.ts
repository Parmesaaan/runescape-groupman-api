import { Request, RequestHandler, Response } from 'express'
import { OperationResult } from '../../../types'
import { UserService } from '../../../services'
import { GetUsersDto } from './getUsers.dto'
import { isOpFailure } from '../../../utils'
import { User } from '../../../models'
import { UserResponseDto } from '../__common'
import { HttpStatusCode } from 'axios'

export const getUsersController: RequestHandler = async (req: Request, res: Response) => {
  const request: GetUsersDto = req.body as unknown as GetUsersDto
  const result: OperationResult = await UserService.getUsers(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const users = result.success!.data as Array<User>
  const response = users.map((user) => new UserResponseDto(user))
  return res.status(HttpStatusCode.Ok).json(response)
}
