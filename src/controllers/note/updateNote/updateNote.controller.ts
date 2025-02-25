import {Request, RequestHandler, Response} from "express";
import {NoteIdDTO} from "../common";
import {OperationResult} from "../../../types";
import {NoteService} from "../../../services";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {UpdateNoteDTO} from "./updateNote.dto";

export const updateNoteController: RequestHandler = async(
    req: Request,
    res: Response,
) => {
    const noteIdDto: NoteIdDTO = req.params as unknown as NoteIdDTO
    const request: UpdateNoteDTO = req.body as unknown as UpdateNoteDTO
    const result: OperationResult = await NoteService.updateNote(noteIdDto, request)

    if (isOpFailure(result)) {
        return res
            .status(result.error!.status)
            .send({ message: result.error!.message });
    }

    return res.status(HttpStatusCode.Created).send({
        message: `Note updated`,
    });
}