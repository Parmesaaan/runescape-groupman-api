import {Expose} from "class-transformer";
import {IsDefined, IsUUID} from "class-validator";
import {Note} from "../../../models";

export class NoteIdDto {
    @Expose()
    @IsUUID()
    @IsDefined()
    noteId!: string
}

export class NoteResponseDto {
    id!: string
    title!: string
    contents!: string
    createdAt!: Date
    updatedAt!: Date

    constructor(note: Note) {
        this.id = note.id
        this.title = note.title
        this.contents = note.contents
        this.createdAt = note.createdAt
        this.updatedAt = note.createdAt
    }
}