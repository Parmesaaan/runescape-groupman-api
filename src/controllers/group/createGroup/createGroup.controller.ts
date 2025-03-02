import { Request, RequestHandler, Response } from 'express'
import { CreateGroupDto } from './createGroup.dto'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { GroupService } from '../../../services'
import { GroupResponseDto } from '../__common'
import { Group } from '../../../models'

export const createGroupController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as CreateGroupDto
  const result = await GroupService.createGroup(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new GroupResponseDto(result.success!.data as Group)
  return res.status(HttpStatusCode.Created).json(response)
}
