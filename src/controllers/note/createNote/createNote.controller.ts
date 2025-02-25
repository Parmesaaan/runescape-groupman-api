import { Request, RequestHandler, Response } from "express";
import { CreateNoteDTO } from "./createNote.dto";
import { OperationResult } from "../../../types";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { NoteService } from "../../../services";

export const noteCreateController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: CreateNoteDTO = req.body as unknown as CreateNoteDTO;
  const result: OperationResult = await NoteService.createNote(request);

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message });
  }

  return res.status(HttpStatusCode.Created).send({
    message: `Note created for ${request.group ? "group " + request.group : "user " + request.user} with title ${request.title}`,
  });
};