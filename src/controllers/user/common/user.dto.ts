import {Expose} from "class-transformer"
import {IsDefined, IsUUID} from "class-validator"
import {User} from "../../../models"

export class UserDto {
    @Expose()
    @IsUUID()
    @IsDefined()
    userId!: string
}

export class UserResponseDto {
    id!: string
    username!: string
    createdAt!: Date
    updatedAt!: Date

    constructor(user: User) {
        this.id = user.id
        this.username = user.username
        this.createdAt = user.createdAt
        this.updatedAt = user.createdAt
    }
}