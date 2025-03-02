import { Request, RequestHandler, Response } from 'express'
import { UpdateGroupNoteDto } from './updateGroupNote.dto'
import { GroupNoteService } from '../../../services'
import { GroupNoteIdDto, GroupNoteResponseDto } from '../__common'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { GroupNote } from '../../../models'

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

  const response = new GroupNoteResponseDto(result.success!.data as GroupNote)
  return res.status(HttpStatusCode.Ok).json(response)
}
