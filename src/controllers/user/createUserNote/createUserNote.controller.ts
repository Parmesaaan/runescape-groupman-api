import { Request, RequestHandler, Response } from 'express'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import {UserNoteService} from "../../../services/userNote.service"
import {CreateUserNoteDto} from "./createUserNote.dto";

export const createUserNoteController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as CreateUserNoteDto
  const result = await UserNoteService.createNote(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Created).send()
}
