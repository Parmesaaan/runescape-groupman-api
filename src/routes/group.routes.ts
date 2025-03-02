import { Router } from 'express'
import { API_ROUTES } from '../config'
import { authenticate } from '../middleware'
import { validateBody, validateParams } from '../utils'
import {
  createGroupController,
  CreateGroupDto,
  createGroupNoteController,
  CreateGroupNoteDto,
  deleteGroupNoteController,
  GroupIdDto,
  GroupNoteIdDto,
  joinGroupController,
  joinRequestController,
  JoinRequestDto,
  leaveGroupController,
  updateGroupController,
  UpdateGroupDto,
  updateGroupNoteController,
  UpdateGroupNoteDto,
} from '../controllers'

export const groupRouter = (): Router => {
  const router = Router()

  /** Access Operations **/

  const joinGroup = API_ROUTES.GROUPS.JOIN
  router.post(
    joinGroup.route,
    authenticate(joinGroup.permissionLevel),
    validateBody(GroupIdDto),
    joinGroupController,
  )

  const joinRequest = API_ROUTES.GROUPS.JOIN_REQUEST
  router.put(
    joinRequest.route,
    authenticate(joinRequest.permissionLevel),
    validateBody(JoinRequestDto),
    joinRequestController,
  )

  const leave = API_ROUTES.GROUPS.LEAVE
  router.delete(
    leave.route,
    authenticate(leave.permissionLevel),
    validateBody(GroupIdDto),
    leaveGroupController,
  )

  /** Group Operations **/

  const createGroup = API_ROUTES.GROUPS.CREATE
  router.post(
    createGroup.route,
    authenticate(createGroup.permissionLevel),
    validateBody(CreateGroupDto),
    createGroupController,
  )

  const updateGroup = API_ROUTES.GROUPS.UPDATE
  router.put(
    updateGroup.route,
    authenticate(updateGroup.permissionLevel),
    validateParams(GroupIdDto),
    validateBody(UpdateGroupDto),
    updateGroupController,
  )

  /** Note Operations **/

  const createNote = API_ROUTES.GROUPS.CREATE_NOTE
  router.post(
    createNote.route,
    authenticate(createNote.permissionLevel),
    validateBody(CreateGroupNoteDto),
    createGroupNoteController,
  )

  const updateNote = API_ROUTES.GROUPS.UPDATE_NOTE
  router.put(
    updateNote.route,
    authenticate(updateNote.permissionLevel),
    validateParams(GroupNoteIdDto),
    validateBody(UpdateGroupNoteDto),
    updateGroupNoteController,
  )

  const deleteNote = API_ROUTES.GROUPS.DELETE_NOTE
  router.delete(
    deleteNote.route,
    authenticate(deleteNote.permissionLevel),
    validateParams(GroupNoteIdDto),
    deleteGroupNoteController,
  )

  return router
}
