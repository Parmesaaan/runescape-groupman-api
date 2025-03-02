import { OperationResult } from '../types'
import { GroupNoteRepository, GroupRepository, MembershipRepository, UserRepository } from '../config'
import { opFailure, opSuccess } from '../utils'
import { HttpStatusCode } from 'axios'
import { GroupNote } from '../models'
import { CreateGroupNoteDto, UpdateGroupNoteDto } from '../controllers'

export class GroupNoteService {
  public static async createNote(
    userId: string,
    groupId: string,
    request: CreateGroupNoteDto,
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({ where: { id: groupId } })
    if (!group) return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    const note = new GroupNote()
    note.title = request.title
    note.contents = request.contents
    note.group = group
    note.author = user

    const savedNote = await GroupNoteRepository.save(note)
    return opSuccess(savedNote)
  }

  public static async updateNote(
    userId: string,
    groupId: string,
    groupNoteId: string,
    request: UpdateGroupNoteDto,
  ): Promise<OperationResult> {
    const note = await GroupNoteRepository.findOne({
      where: { id: groupNoteId },
      relations: ['author'],
    })
    if (!note)
      return opFailure(HttpStatusCode.NotFound, `Cannot find group note with id ${groupNoteId}`)

    const membership = await MembershipRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    })
    if (!membership) return opFailure(HttpStatusCode.NotFound, `You are not a member of this group`)

    if ((!note.author || note.author.id != userId) && membership.role <= 0) {
      return opFailure(HttpStatusCode.Forbidden, `You don't have permission to modify this note`)
    }

    note.title = request.title ?? note.title
    note.contents = request.contents ?? note.contents

    const savedNote = await GroupNoteRepository.save(note)
    return opSuccess(savedNote)
  }

  public static async deleteNote(
    userId: string,
    groupId: string,
    groupNoteId: string,
  ): Promise<OperationResult> {
    const note = await GroupNoteRepository.findOne({
      where: { id: groupNoteId },
      relations: ['author'],
    })
    if (!note)
      return opFailure(HttpStatusCode.NotFound, `Cannot find group note with id ${groupNoteId}`)

    const membership = await MembershipRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    })
    if (!membership) return opFailure(HttpStatusCode.NotFound, `You are not a member of this group`)

    if ((!note.author || note.author.id != userId) && membership.role <= 0) {
      return opFailure(HttpStatusCode.Forbidden, `You don't have permission to delete this note`)
    }

    await GroupNoteRepository.remove(note)
    return opSuccess(true)
  }
}
