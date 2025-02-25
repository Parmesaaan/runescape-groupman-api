import { Request, RequestHandler, Response } from "express"
import { CreateNoteDto } from "./createNote.dto"
import { OperationResult } from "../../../types"
import { isOpFailure } from "../../../utils"
import { HttpStatusCode } from "axios"
import { NoteService } from "../../../services"
import {Note} from "../../../models"
import {NoteResponseDto} from "../common"

export const createNoteController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: CreateNoteDto = req.body as unknown as CreateNoteDto
  const result: OperationResult = await NoteService.createNote(request)

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message })
  }

  const note = result.success!.data as Note
  const response = new NoteResponseDto(note)
  return res.status(HttpStatusCode.Created).send(response)
}