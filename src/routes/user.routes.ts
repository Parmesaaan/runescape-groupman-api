import { Router } from 'express'
import { API_ROUTES } from '../config'
import { validateBody, validateParams } from '../utils'
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
  signupController,
  TaskDto,
  TaskIdDto,
  updateTaskController,
  updateUserController,
  UpdateUserDto,
  updateUserNoteController,
  UpdateUserNoteDto,
  UserNoteIdDto,
} from '../controllers'
import { authenticate, loginLimiter, refreshTokenLimiter, signupLimiter } from '../middleware'
import { getUserProfileController } from '../controllers/user/getUserProfile'

export const userRouter = (): Router => {
  const router = Router()

  /** Access Operations **/

  const signup = API_ROUTES.USERS.ACCESS.SIGNUP
  router.post(
    signup.route,
    signupLimiter,
    validateBody(CredentialsDto),
    signupController,
  )

  const login = API_ROUTES.USERS.ACCESS.LOGIN
  router.post(
    login.route,
    loginLimiter,
    validateBody(CredentialsDto),
    loginController,
  )

  const refreshToken = API_ROUTES.USERS.ACCESS.REFRESH_TOKEN
  router.post(
    refreshToken.route,
    refreshTokenLimiter,
    validateBody(RefreshTokenDto),
    refreshTokenController,
  )

  const changePassword = API_ROUTES.USERS.ACCESS.CHANGE_PASSWORD
  router.post(
    changePassword.route,
    authenticate(changePassword.permissionLevel),
    validateBody(ChangePasswordDto),
    changePasswordController,
  )

  /** User Operations **/

  const getUserProfile = API_ROUTES.USERS.ROOT.GET_PROFILE
  router.get(
    getUserProfile.route,
    authenticate(getUserProfile.permissionLevel),
    getUserProfileController,
  )

  const updateUser = API_ROUTES.USERS.ROOT.UPDATE
  router.put(
    updateUser.route,
    authenticate(updateUser.permissionLevel),
    validateBody(UpdateUserDto),
    updateUserController,
  )

  /** Note Operations **/

  const createNote = API_ROUTES.USERS.NOTES.CREATE_NOTE
  router.post(
    createNote.route,
    authenticate(createNote.permissionLevel),
    validateBody(CreateUserNoteDto),
    createUserNoteController,
  )

  const updateNote = API_ROUTES.USERS.NOTES.UPDATE_NOTE
  router.put(
    updateNote.route,
    authenticate(updateNote.permissionLevel),
    validateParams(UserNoteIdDto),
    validateBody(UpdateUserNoteDto),
    updateUserNoteController,
  )

  const deleteNote = API_ROUTES.USERS.NOTES.DELETE_NOTE
  router.delete(
    deleteNote.route,
    authenticate(updateNote.permissionLevel),
    validateParams(UserNoteIdDto),
    deleteUserNoteController,
  )

  /** Task Operations **/

  const createTask = API_ROUTES.USERS.TASKS.CREATE_TASK
  router.post(
    createTask.route,
    authenticate(createTask.permissionLevel),
    validateBody(TaskDto),
    createTaskController,
  )

  const updateTask = API_ROUTES.USERS.TASKS.UPDATE_TASK
  router.put(
    updateTask.route,
    authenticate(updateTask.permissionLevel),
    validateParams(TaskIdDto),
    validateBody(TaskDto),
    updateTaskController,
  )

  const deleteTask = API_ROUTES.USERS.TASKS.DELETE_TASK
  router.delete(
    deleteTask.route,
    authenticate(updateTask.permissionLevel),
    validateParams(TaskIdDto),
    deleteTaskController,
  )

  return router
}
