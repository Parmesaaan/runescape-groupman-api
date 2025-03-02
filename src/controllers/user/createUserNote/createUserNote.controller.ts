import { Request, RequestHandler, Response } from 'express'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { UserNoteService } from '../../../services'
import { CreateUserNoteDto } from './createUserNote.dto'
import { UserNoteResponseDto } from '../__common'
import { UserNote } from '../../../models'

export const createUserNoteController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as CreateUserNoteDto
  const result = await UserNoteService.createNote(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new UserNoteResponseDto(result.success!.data as UserNote)
  return res.status(HttpStatusCode.Created).json(response)
}
