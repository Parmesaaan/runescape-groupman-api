import { Request, RequestHandler, Response } from 'express'
import { ChangePasswordDto } from './changePassword.dto'
import { isOpFailure } from '../../../utils'
import { UserService } from '../../../services'
import { HttpStatusCode } from 'axios'
import { UserResponseDto } from '../__common'
import { User } from '../../../models'

export const changePasswordController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as ChangePasswordDto
  const result = await UserService.changePassword(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new UserResponseDto(result.success!.data as User)
  return res.status(HttpStatusCode.Ok).json(response)
}
