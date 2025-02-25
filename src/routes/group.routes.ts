import { Router } from "express";
import { API_ROUTES } from "../config";
import { validateBody } from "../utils";
import {
  CreateGroupDto,
  createGroupController,
  joinGroupController,
  leaveGroupController,
  JoinGroupDto,
  LeaveGroupDto,
} from "../controllers";
import { authenticate } from "../middleware";

export const groupRouter = (): Router => {
  const router = Router();

  router.post(
    API_ROUTES.GROUP.CREATE,
    authenticate,
    validateBody(CreateGroupDto),
    createGroupController,
  );

  router.post(
    API_ROUTES.GROUP.JOIN,
    authenticate,
    validateBody(JoinGroupDto),
    joinGroupController,
  );

  router.post(
    API_ROUTES.GROUP.LEAVE,
    authenticate,
    validateBody(LeaveGroupDto),
    leaveGroupController,
  );

  return router;
};