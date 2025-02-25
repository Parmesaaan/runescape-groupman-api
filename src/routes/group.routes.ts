import { Router } from "express"
import { API_ROUTES } from "../config"
import {validateBody, validateParams} from "../utils"
import {
  CreateGroupDto,
  createGroupController,
  joinGroupController,
  leaveGroupController,
  JoinGroupDto,
  LeaveGroupDto,
  GroupIdDto,
} from "../controllers"
import { authenticate } from "../middleware"

export const groupRouter = (): Router => {
  const router = Router()

  router.post(
      API_ROUTES.GROUP.CREATE,
      authenticate,
      validateBody(CreateGroupDto),
      createGroupController,
  )

  router.post(
      API_ROUTES.GROUP.JOIN,
      authenticate,
      validateParams(GroupIdDto),
      validateBody(JoinGroupDto),
      joinGroupController,
  )

  router.post(
      API_ROUTES.GROUP.LEAVE,
      authenticate,
      validateParams(GroupIdDto),
      validateBody(LeaveGroupDto),
      leaveGroupController,
  )

  return router
}