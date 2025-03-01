import {Request, RequestHandler, Response} from 'express'
import {GroupService} from '../../../services'
import {isOpFailure} from '../../../utils'
import {HttpStatusCode} from 'axios'
import {JoinGroupDto} from "./joinGroup.dto";

export const joinGroupController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.params as unknown as JoinGroupDto
  const result = await GroupService.joinGroup(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({message: result.error!.message})
  }

  return res.status(HttpStatusCode.Ok).send()
}
