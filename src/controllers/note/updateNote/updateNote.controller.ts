import {Request, RequestHandler, Response} from "express";
import {NoteIdDto, NoteResponseDto} from "../common";
import {OperationResult} from "../../../types";
import {NoteService} from "../../../services";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {UpdateNoteDto} from "./updateNote.dto";
import {Note} from "../../../models";

export const updateNoteController: RequestHandler = async(
    req: Request,
    res: Response,
) => {
    const noteIdDto: NoteIdDto = req.params as unknown as NoteIdDto
    const request: UpdateNoteDto = req.body as unknown as UpdateNoteDto
    const result: OperationResult = await NoteService.updateNote(noteIdDto, request)

    if (isOpFailure(result)) {
        return res
            .status(result.error!.status)
            .send({ message: result.error!.message });
    }

    const note = result.success!.data as Note
    const response = new NoteResponseDto(note)
    return res.status(HttpStatusCode.Created).json(response)
}