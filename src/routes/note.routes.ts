import { Router } from "express";
import { API_ROUTES } from "../config";
import { authenticate } from "../middleware";
import { validateBody } from "../utils";
import { CreateNoteDTO, noteCreateController } from "../controllers";

export const noteRouter = (): Router => {
  const router = Router();

  router.post(
    API_ROUTES.NOTE.CREATE,
    authenticate,
    validateBody(CreateNoteDTO),
    noteCreateController,
  );

  return router;
};