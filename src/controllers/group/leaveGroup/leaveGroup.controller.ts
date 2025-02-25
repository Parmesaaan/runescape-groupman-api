import { Request, RequestHandler, Response } from 'express'
import { OperationResult } from '../../../types'
import { GroupService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { Group } from '../../../models'
import { GroupIdDto, GroupResponseDto } from '../__common'
import { UserIdDto } from '../../user'

export const leaveGroupController: RequestHandler = async (req: Request, res: Response) => {
  const groupIdDto: GroupIdDto = req.params as unknown as GroupIdDto
  const request: UserIdDto = req.body as unknown as UserIdDto
  const result: OperationResult = await GroupService.leaveGroup(groupIdDto, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const group = result.success!.data as Group
  const response: GroupResponseDto = new GroupResponseDto(group)
  return res.status(HttpStatusCode.Ok).json(response)
}
