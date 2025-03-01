import {OperationResult} from "../types";
import {UserNoteRepository, UserRepository} from "../config";
import {opFailure, opSuccess} from "../utils";
import {HttpStatusCode} from "axios";
import {UserNote} from "../models";
import {CreateUserNoteDto} from "../controllers/user/createUserNote";
import {UpdateUserNoteDto} from "../controllers/user/updateUserNote";

export class UserNoteService {
  public static async createNote(userId: string, request: CreateUserNoteDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({where: {id: userId}})
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const note = new UserNote()
    note.title = request.title
    note.contents = request.contents
    note.user = user

    const savedNote = await UserNoteRepository.save(note)
    return opSuccess(savedNote)
  }

  public static async updateNote(userId: string, userNoteId: string, request: UpdateUserNoteDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({where: {id: userId}})
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const note = await UserNoteRepository.findOne({where: {id: userNoteId}, relations: ['user']})
    if (!note) return opFailure(HttpStatusCode.NotFound, `Cannot find user note with id ${userNoteId}`)

    if (note.user.id != user.id) return opFailure(HttpStatusCode.Forbidden, `You can only change your own notes`)

    note.title = request.title ?? note.title
    note.contents = request.contents ?? note.contents

    const savedNote = await UserNoteRepository.save(note)
    return opSuccess(savedNote)
  }

  public static async deleteNote(userId: string, userNoteId: string): Promise<OperationResult> {
    const note = await UserNoteRepository.findOne({
      where: {id: userNoteId, user: {id: userId}},
      relations: ['user'],
    })

    if (!note) return opFailure(HttpStatusCode.NotFound, `Cannot find user note with id ${userNoteId} for user ${userId}`)

    await UserNoteRepository.remove(note)
    return opSuccess(true)
  }
}