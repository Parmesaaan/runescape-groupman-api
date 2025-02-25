import {Expose} from "class-transformer";
import {IsDefined, IsUUID} from "class-validator";

export class NoteIdDTO {
    @Expose()
    @IsUUID()
    @IsDefined()
    noteId!: string
}