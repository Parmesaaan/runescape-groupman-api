import {Request, RequestHandler, Response} from "express";
import {UserNoteDto, UserNoteIdDto} from "../__common";
import {UserNoteService} from "../../../services/userNote.service";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";

export const updateUserNoteController: RequestHandler = async (req: Request, res: Response) => {
  const userNoteIdDto = req.params as unknown as UserNoteIdDto
  const request = req.body as unknown as UserNoteDto
  const result = await UserNoteService.updateNote(req.user!.id, userNoteIdDto.userNoteId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Ok).send()
}
