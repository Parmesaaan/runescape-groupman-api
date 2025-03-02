import { Request, RequestHandler, Response } from 'express'
import { UserService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { UpdateUserDto } from './updateUser.dto'
import { UserResponseDto } from '../__common'
import { User } from '../../../models'

export const updateUserController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as UpdateUserDto
  const result = await UserService.updateUser(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new UserResponseDto(result.success!.data as User)
  return res.status(HttpStatusCode.Ok).json(response)
}
