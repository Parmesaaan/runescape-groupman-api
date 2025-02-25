import { Request, RequestHandler, Response } from 'express'
import { RegisterUserDto } from './registerUser.dto'
import { OperationResult } from '../../../types'
import { UserService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { User } from '../../../models'
import { UserResponseDto } from '../__common'

export const registerUserController: RequestHandler = async (req: Request, res: Response) => {
  const request: RegisterUserDto = req.body as unknown as RegisterUserDto
  const result: OperationResult = await UserService.createUser(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const user = result.success!.data as User
  const response: UserResponseDto = new UserResponseDto(user)
  return res.status(HttpStatusCode.Created).json(response)
}
