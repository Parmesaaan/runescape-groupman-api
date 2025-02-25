import { Request, RequestHandler, Response } from 'express'
import { LoginUserDto, LoginUserResponseDto } from './loginUser.dto'
import { UserService } from '../../../services'
import { OperationResult } from '../../../types'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { User } from '../../../models'

export const loginUserController: RequestHandler = async (req: Request, res: Response) => {
  const request: LoginUserDto = req.body as unknown as LoginUserDto
  const result: OperationResult = await UserService.loginUser(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const { user, token } = result.success!.data as { user: User; token: string }
  const response: LoginUserResponseDto = new LoginUserResponseDto(user, token)
  return res.status(HttpStatusCode.Ok).json(response)
}
