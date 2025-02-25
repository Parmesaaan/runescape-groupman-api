import { CreateNoteDto, NoteIdDto, UpdateNoteDto } from '../controllers'
import { OperationResult } from '../types'
import { Note } from '../models'
import { GroupRepository, NoteRepository, UserRepository } from '../config'
import { opFailure, opSuccess } from '../utils'
import { HttpStatusCode } from 'axios'

export class NoteService {
  public static async createNote(request: CreateNoteDto): Promise<OperationResult> {
    const note = new Note()
    note.title = request.title
    note.contents = request.content

    if (!!request.groupId === !!request.userId) {
      return opFailure(HttpStatusCode.BadRequest, 'Exactly one of `groupId` or `userId` must be defined.')
    }

    if (request.groupId) {
      const group = await GroupRepository.findOne({
        where: { id: request.groupId },
        relations: ['users'],
      })
      if (!group) {
        return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${request.groupId}`)
      }

      note.group = group
    }

    if (request.userId) {
      const user = await UserRepository.findOne({
        where: { id: request.userId },
      })
      if (!user) {
        return opFailure(HttpStatusCode.NotFound, `Cannot find user with username ${request.userId}`)
      }

      note.user = user
    }

    const savedNote = await NoteRepository.save(note)
    if (!savedNote) return opFailure()

    return opSuccess(note)
  }

  public static async updateNote(nodeIdDto: NoteIdDto, request: UpdateNoteDto): Promise<OperationResult> {
    const note = await NoteRepository.findOne({ where: { id: nodeIdDto.noteId } })

    if (!note) {
      return opFailure(HttpStatusCode.NotFound, `Cannot find task`)
    }

    note.title = request.title ?? note.title
    note.contents = request.content ?? note.contents

    const savedNote = await NoteRepository.save(note)
    if (!savedNote) return opFailure()

    return opSuccess(savedNote)
  }
}
