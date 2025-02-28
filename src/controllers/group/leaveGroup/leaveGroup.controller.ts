import { Request, RequestHandler, Response } from 'express'
import { OperationResult } from '../../../types'
import { GroupService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { Group } from '../../../models'
import { GroupIdDto, GroupResponseDto } from '../__common'
import { UserIdDto } from '../../user'

export const leaveGroupController: RequestHandler = async (req: Request, res: Response) => {
  const groupId: string = (req.params as unknown as GroupIdDto).groupId
  const result: OperationResult = await GroupService.leaveGroup(req.user!.id, groupId)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Ok).send()
}
