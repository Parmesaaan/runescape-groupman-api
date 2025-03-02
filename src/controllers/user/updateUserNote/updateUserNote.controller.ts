import { Request, RequestHandler, Response } from 'express'
import { UserNoteIdDto, UserNoteResponseDto } from '../__common'
import { UserNoteService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { UpdateUserNoteDto } from './updateUserNote.dto'
import { UserNote } from '../../../models'

export const updateUserNoteController: RequestHandler = async (req: Request, res: Response) => {
  const userNoteIdDto = req.params as unknown as UserNoteIdDto
  const request = req.body as unknown as UpdateUserNoteDto
  const result = await UserNoteService.updateNote(req.user!.id, userNoteIdDto.userNoteId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new UserNoteResponseDto(result.success!.data as UserNote)
  return res.status(HttpStatusCode.Ok).json(response)
}
