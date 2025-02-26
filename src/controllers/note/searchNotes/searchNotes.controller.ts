import { Request, RequestHandler, Response } from 'express'
import { SearchNotesDto } from './searchNotes.dto'
import { OperationResult } from '../../../types'
import { NoteService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { Note } from '../../../models'
import { NoteResponseDto } from '../__common'
import { HttpStatusCode } from 'axios'

export const searchNotesController: RequestHandler = async (req: Request, res: Response) => {
  const request: SearchNotesDto = req.body as unknown as SearchNotesDto
  const result: OperationResult = await NoteService.getNotes(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const notes = result.success!.data as Array<Note>
  const response = notes.map((note) => new NoteResponseDto(note))
  return res.status(HttpStatusCode.Ok).json(response)
}
