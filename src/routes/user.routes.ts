import { Router } from 'express'
import { API_ROUTES } from '../config'
import { validateBody, validateParams } from '../utils'
import { signupController } from '../controllers/user/signup'
import {
  changePasswordController,
  ChangePasswordDto,
  createTaskController,
  createUserNoteController,
  CreateUserNoteDto,
  CredentialsDto,
  deleteTaskController,
  deleteUserNoteController,
  loginController,
  refreshTokenController,
  RefreshTokenDto,
  TaskDto,
  TaskIdDto,
  updateTaskController,
  updateUserController,
  UpdateUserDto,
  updateUserNoteController,
  UpdateUserNoteDto,
  UserNoteIdDto,
} from '../controllers'
import { authenticate } from '../middleware'

export const userRouter = (): Router => {
  const router = Router()

  /** Access Operations **/

  const signup = API_ROUTES.SIGNUP
  router.post(signup.route, validateBody(CredentialsDto), signupController)

  const login = API_ROUTES.LOGIN
  router.post(login.route, validateBody(CredentialsDto), loginController)

  const refreshToken = API_ROUTES.REFRESH_TOKEN
  router.post(
    refreshToken.route,
    authenticate(refreshToken.permissionLevel),
    validateBody(RefreshTokenDto),
    refreshTokenController,
  )

  const changePassword = API_ROUTES.CHANGE_PASSWORD
  router.post(
    changePassword.route,
    authenticate(changePassword.permissionLevel),
    validateBody(ChangePasswordDto),
    changePasswordController,
  )

  /** User Operations **/

  const updateUser = API_ROUTES.USERS.UPDATE
  router.put(
    updateUser.route,
    authenticate(updateUser.permissionLevel),
    validateBody(UpdateUserDto),
    updateUserController,
  )

  /** Note Operations **/

  const createNote = API_ROUTES.USERS.CREATE_NOTE
  router.post(
    createNote.route,
    authenticate(createNote.permissionLevel),
    validateBody(CreateUserNoteDto),
    createUserNoteController,
  )

  const updateNote = API_ROUTES.USERS.UPDATE_NOTE
  router.put(
    updateNote.route,
    authenticate(updateNote.permissionLevel),
    validateParams(UserNoteIdDto),
    validateBody(UpdateUserNoteDto),
    updateUserNoteController,
  )

  const deleteNote = API_ROUTES.USERS.DELETE_NOTE
  router.delete(
    deleteNote.route,
    authenticate(updateNote.permissionLevel),
    validateParams(UserNoteIdDto),
    deleteUserNoteController,
  )

  /** Task Operations **/

  const createTask = API_ROUTES.USERS.CREATE_TASK
  router.post(
    createTask.route,
    authenticate(createTask.permissionLevel),
    validateBody(TaskDto),
    createTaskController,
  )

  const updateTask = API_ROUTES.USERS.UPDATE_TASK
  router.put(
    updateTask.route,
    authenticate(updateTask.permissionLevel),
    validateParams(TaskIdDto),
    validateBody(TaskDto),
    updateTaskController,
  )

  const deleteTask = API_ROUTES.USERS.DELETE_TASK
  router.delete(
    deleteTask.route,
    authenticate(updateTask.permissionLevel),
    validateParams(TaskIdDto),
    deleteTaskController,
  )

  return router
}
