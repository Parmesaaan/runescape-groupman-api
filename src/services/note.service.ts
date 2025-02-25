import {CreateNoteDTO} from "../controllers/note";
import {OperationResult} from "../types";
import {Note} from "../models";
import {GroupRepository, NoteRepository, UserRepository} from "../config";
import {opFailure, opSuccess} from "../utils";
import {HttpStatusCode} from "axios";

export class NoteService {
    public static async createNote(request: CreateNoteDTO): Promise<OperationResult> {
        const note = new Note()
        note.title = request.title
        note.contents = request.content

        if(note.group) {
            const group = await GroupRepository.findOne({where: {name: request.group}, relations: ["members"]})
            if (!group){
                return opFailure(HttpStatusCode.NotFound, `Cannot find group with name ${request.group}`)
            }

            note.group = group
        }

        if(note.user) {
            const user = await UserRepository.findOne({where: {username: request.user}})
            if (!user){
                return opFailure(HttpStatusCode.NotFound, `Cannot find user with username ${request.user}`)
            }

            note.user = user
        }

        const savedNote = await NoteRepository.save(note)
        if (!savedNote) return opFailure()

        return opSuccess(note)
    }
}