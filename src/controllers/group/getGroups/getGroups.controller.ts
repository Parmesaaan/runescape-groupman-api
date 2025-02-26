import { Request, RequestHandler, Response } from 'express'
import { OperationResult } from '../../../types'
import { Group } from '../../../models'
import { GroupResponseDto } from '../__common'
import { GetGroupsDto } from './getGroups.dto'
import { GroupService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'

export const getGroupsController: RequestHandler = async (req: Request, res: Response) => {
  const request: GetGroupsDto = req.body as unknown as GetGroupsDto
  const result: OperationResult = await GroupService.getGroups(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const groups = result.success!.data as Array<Group>
  const response = groups.map((group) => new GroupResponseDto(group))
  return res.status(HttpStatusCode.Ok).json(response)
}
