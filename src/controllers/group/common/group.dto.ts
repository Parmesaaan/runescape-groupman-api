import {Expose} from "class-transformer";
import {IsDefined, IsUUID} from "class-validator";
import {Group} from "../../../models";
import {UserResponseDto} from "../../user";
import {NoteResponseDto} from "../../note";
import {TaskResponseDto} from "../../task";

export class GroupIdDto {
    @Expose()
    @IsUUID()
    @IsDefined()
    groupId!: string
}

export class GroupResponseDto {
    id!: string
    name!: string
    createdAt!: Date
    updatedAt!: Date
    // users?: Array<UserResponseDto>
    // notes?: Array<NoteResponseDto>
    // tasks?: Array<TaskResponseDto>

    constructor(group: Group) {
        this.id = group.id
        this.name = group.id
        this.createdAt = group.createdAt
        this.updatedAt = group.updatedAt

        // if(group.users && group.users.length) {
        //     this.users = new Array<UserResponseDto>()
        //     for(const user of group.users) {
        //         this.users.push(new UserResponseDto(user))
        //     }
        // }
        //
        // if(group.notes && group.notes.length) {
        //     this.notes = new Array<NoteResponseDto>()
        //     for(const note of group.notes) {
        //         this.notes.push(new NoteResponseDto(note))
        //     }
        // }
        //
        // if(group.tasks && group.tasks.length) {
        //     this.tasks = new Array<TaskResponseDto>()
        //     for(const task of group.tasks) {
        //         this.tasks.push(new TaskResponseDto(task))
        //     }
        // }
    }
}