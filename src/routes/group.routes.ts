import { Router } from 'express'
import { API_ROUTES } from '../config'
import { validateBody, validateParams } from '../utils'
import {
  createGroupController,
  CreateGroupDto,
  GroupIdDto,
  joinGroupController,
  leaveGroupController,
  UserIdDto,
} from '../controllers'
import { authenticate } from '../middleware'

export const groupRouter = (): Router => {
  const router = Router()

  router.post(API_ROUTES.GROUP.CREATE, authenticate, validateBody(CreateGroupDto), createGroupController)

  router.post(API_ROUTES.GROUP.JOIN, authenticate, validateParams(GroupIdDto), validateBody(UserIdDto), joinGroupController)

  router.post(API_ROUTES.GROUP.LEAVE, authenticate, validateParams(GroupIdDto), validateBody(UserIdDto), leaveGroupController)

  return router
}
