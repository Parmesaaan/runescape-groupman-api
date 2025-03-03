import { Request, RequestHandler, Response } from 'express'
import { UserService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'

export const getUserProfileController: RequestHandler = async (req: Request, res: Response) => {
  const result = await UserService.getUserProfile(req.user!.id)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Ok).json(result.success!.data)
}