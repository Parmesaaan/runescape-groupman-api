import { Request, RequestHandler, Response } from 'express'
import { CreateGroupNoteDto } from './createGroupNote.dto'
import { GroupIdDto, GroupNoteResponseDto } from '../__common'
import { GroupNoteService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { GroupNote } from '../../../models'

export const createGroupNoteController: RequestHandler = async (req: Request, res: Response) => {
  const groupId = (req.params as unknown as GroupIdDto).groupId
  const request = req.body as unknown as CreateGroupNoteDto
  const result = await GroupNoteService.createNote(req.user!.id, groupId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new GroupNoteResponseDto(result.success!.data as GroupNote)
  return res.status(HttpStatusCode.Created).json(response)
}
