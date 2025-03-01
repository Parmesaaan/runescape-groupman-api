import {OperationResult} from "../types";
import {UserNoteRepository, UserRepository} from "../config";
import {opFailure, opSuccess} from "../utils";
import {HttpStatusCode} from "axios";
import {UserNote} from "../models";
import {UserNoteDto} from "../controllers";

export class UserNoteService {
  public static async createNote(userId: string, request: UserNoteDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const note = new UserNote()
    note.title = request.title
    note.contents = request.contents
    note.user = user

    const savedNote = await UserNoteRepository.save(note)
    return opSuccess(savedNote)
  }

  public static async updateNote(userId: string, userNoteId: string, request: UserNoteDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const note = await UserNoteRepository.findOne({ where: { id: userNoteId }, relations: ['user'] })
    if (!note) return opFailure(HttpStatusCode.NotFound, `Cannot find note with id ${userNoteId}`)

    if (note.user.id != user.id) return opFailure(HttpStatusCode.Forbidden, `You can only change your own notes`)

    note.title = request.title ?? note.title
    note.contents = request.contents ?? note.contents

    const savedNote = await UserNoteRepository.save(note)
    return opSuccess(savedNote)
  }

  public static async deleteNote(userId: string, userNoteId: string): Promise<OperationResult> {
    const note = await UserNoteRepository.findOne({
      where: { id: userNoteId, user: { id: userId } },
      relations: ['user'],
    })

    if (!note) return opFailure(HttpStatusCode.NotFound, `Cannot find note with id ${userNoteId} for user ${userId}`)

    await UserNoteRepository.delete(userNoteId)
    return opSuccess(true)
  }
}