import { Request, RequestHandler, Response } from 'express'
import { GroupNoteIdDto } from '../__common'
import { GroupNoteService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'

export const deleteGroupNoteController: RequestHandler = async (req: Request, res: Response) => {
  const idDto = req.params as unknown as GroupNoteIdDto
  const result = await GroupNoteService.deleteNote(req.user!.id, idDto.groupId, idDto.groupNoteId)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.NoContent).send()
}
