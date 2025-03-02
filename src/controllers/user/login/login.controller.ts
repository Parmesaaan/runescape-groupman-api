import { Request, RequestHandler, Response } from 'express'
import { UserService } from '../../../services'
import { isOpFailure, TokenPair } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { AuthResponseDto, CredentialsDto } from '../__common'

export const loginController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as CredentialsDto
  const result = await UserService.login(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const tokenPair = result.success!.data as TokenPair
  const response: AuthResponseDto = new AuthResponseDto(tokenPair.token, tokenPair.refresh)
  return res.status(HttpStatusCode.Ok).json(response)
}
