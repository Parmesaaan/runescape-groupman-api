import {Request, RequestHandler, Response} from "express";
import {CreateGroupNoteDto} from "./createGroupNote.dto";
import {GroupIdDto} from "../__common";
import {GroupNoteService} from "../../../services/groupNote.service";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";

export const createGroupNoteController: RequestHandler = async (req: Request, res: Response) => {
  const groupId = (req.params as unknown as GroupIdDto).groupId
  const request = req.body as unknown as CreateGroupNoteDto
  const result = await GroupNoteService.createNote(req.user!.id, groupId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({message: result.error!.message})
  }

  return res.status(HttpStatusCode.Created).send()
}
