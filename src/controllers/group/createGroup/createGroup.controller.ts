import { Request, RequestHandler, Response } from 'express'
import { CreateGroupDto } from './createGroup.dto'
import { OperationResult } from '../../../types'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { GroupService } from '../../../services'
import { Group } from '../../../models'
import { GroupResponseDto } from '../__common'

export const createGroupController: RequestHandler = async (req: Request, res: Response) => {
  const request: CreateGroupDto = req.body as unknown as CreateGroupDto
  const result: OperationResult = await GroupService.createGroup(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const group = result.success!.data as Group
  const response: GroupResponseDto = new GroupResponseDto(group)
  return res.status(HttpStatusCode.Created).json(response)
}
