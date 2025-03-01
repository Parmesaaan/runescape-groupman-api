import {Request, RequestHandler, Response} from "express";
import {UserNoteIdDto} from "../__common";
import {UserNoteService} from "../../../services/userNote.service";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";

export const deleteUserNoteController: RequestHandler = async (req: Request, res: Response) => {
  const userNoteIdDto = req.params as unknown as UserNoteIdDto
  const result = await UserNoteService.deleteNote(req.user!.id, userNoteIdDto.userNoteId)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.NoContent).send()
}
