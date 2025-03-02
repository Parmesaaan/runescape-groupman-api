import { Request, RequestHandler, Response } from 'express'
import { GroupService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { GroupIdDto } from '../__common'

export const joinGroupController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as GroupIdDto
  const result = await GroupService.joinGroup(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Ok).send()
}
