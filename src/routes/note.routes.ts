import { Router } from "express";
import { API_ROUTES } from "../config";
import { authenticate } from "../middleware";
import {validateBody, validateParams} from "../utils";
import {CreateNoteDTO, createNoteController, updateNoteController, UpdateNoteDTO, NoteIdDTO} from "../controllers";

export const noteRouter = (): Router => {
  const router = Router();

  router.post(
      API_ROUTES.NOTE.CREATE,
      authenticate,
      validateBody(CreateNoteDTO),
      createNoteController,
  )

  router.post(
      API_ROUTES.NOTE.UPDATE,
      authenticate,
      validateParams(NoteIdDTO),
      validateBody(UpdateNoteDTO),
      updateNoteController
  )

  return router;
};