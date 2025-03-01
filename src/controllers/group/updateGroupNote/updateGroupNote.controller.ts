import { Request, RequestHandler, Response } from 'express'
import { UpdateGroupNoteDto } from './updateGroupNote.dto'
import { GroupNoteService } from '../../../services'
import { GroupNoteIdDto } from '../__common'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'

export const updateGroupNoteController: RequestHandler = async (req: Request, res: Response) => {
  const idDto = req.params as unknown as GroupNoteIdDto
  const request = req.body as unknown as UpdateGroupNoteDto
  const result = await GroupNoteService.updateNote(
    req.user!.id,
    idDto.groupId,
    idDto.groupNoteId,
    request,
  )

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Ok).send()
}
