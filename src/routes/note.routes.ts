import { Router } from 'express'
import { API_ROUTES } from '../config'
import { authenticate } from '../middleware'
import { validateBody, validateParams } from '../utils'
import { createNoteController, CreateNoteDto, NoteIdDto, updateNoteController, UpdateNoteDto } from '../controllers'

export const noteRouter = (): Router => {
  const router = Router()

  router.post(API_ROUTES.NOTE.CREATE, authenticate, validateBody(CreateNoteDto), createNoteController)

  router.post(
    API_ROUTES.NOTE.UPDATE,
    authenticate,
    validateParams(NoteIdDto),
    validateBody(UpdateNoteDto),
    updateNoteController,
  )

  return router
}
