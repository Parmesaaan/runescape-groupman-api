import { Request, RequestHandler, Response } from 'express'
import { UserService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { CredentialsDto, UserResponseDto } from '../__common'
import { User } from '../../../models'

export const signupController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as CredentialsDto
  const result = await UserService.signup(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new UserResponseDto(result.success!.data as User)
  return res.status(HttpStatusCode.Created).json(response)
}
