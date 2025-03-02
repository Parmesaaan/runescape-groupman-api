import { Request, RequestHandler, Response } from 'express'
import { GroupService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { JoinRequestDto } from './joinRequest.dto'
import { JoinRequestResponseDto } from '../__common'
import { JoinRequest } from '../../../models'

export const joinRequestController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as JoinRequestDto
  const result = await GroupService.finalizeJoinRequest(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new JoinRequestResponseDto(result.success!.data as JoinRequest)
  return res.status(HttpStatusCode.Ok).json(response)
}
