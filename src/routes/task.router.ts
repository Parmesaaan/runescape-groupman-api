import { Router } from 'express'
import { API_ROUTES } from '../config'
import { authenticate } from '../middleware'
import { validateBody, validateParams } from '../utils'
import {
  createTaskController,
  CreateTaskDto,
  searchTasksController,
  SearchTasksDto,
  TaskIdDto,
  updateTaskController,
  UpdateTaskDto,
} from '../controllers'

export const taskRouter = (): Router => {
  const router = Router()

  router.post(
    API_ROUTES.TASK.CREATE,
    authenticate,
    validateBody(CreateTaskDto),
    createTaskController,
  )

  router.post(
    API_ROUTES.TASK.UPDATE,
    authenticate,
    validateParams(TaskIdDto),
    validateBody(UpdateTaskDto),
    updateTaskController,
  )

  router.post(
    API_ROUTES.TASK.SEARCH,
    authenticate,
    validateBody(SearchTasksDto),
    searchTasksController,
  )

  return router
}
