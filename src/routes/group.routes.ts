import { Router } from "express";
import { API_ROUTES } from "../config";
import { validateBody } from "../utils";
import {
  CreateGroupDTO,
  groupCreateController,
  groupJoinController,
  groupLeaveController,
  JoinGroupDTO,
  LeaveGroupDTO,
} from "../controllers";
import { authenticate } from "../middleware";

export const groupRouter = (): Router => {
  const router = Router();

  router.post(
    API_ROUTES.GROUP.CREATE,
    authenticate,
    validateBody(CreateGroupDTO),
    groupCreateController,
  );

  router.post(
    API_ROUTES.GROUP.JOIN,
    authenticate,
    validateBody(JoinGroupDTO),
    groupJoinController,
  );

  router.post(
    API_ROUTES.GROUP.LEAVE,
    authenticate,
    validateBody(LeaveGroupDTO),
    groupLeaveController,
  );

  return router;
};