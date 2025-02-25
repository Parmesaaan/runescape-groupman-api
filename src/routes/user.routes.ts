import { Router } from 'express'
import { API_ROUTES } from '../config'
import { validateBody, validateParams } from '../utils'
import {
  loginUserController,
  LoginUserDto,
  registerUserController,
  RegisterUserDto,
  updateUserController,
  UpdateUserDto,
  UserIdDto,
} from '../controllers'
import { authenticate } from '../middleware'

export const userRouter = (): Router => {
  const router = Router()

  router.post(API_ROUTES.USER.REGISTER, validateBody(RegisterUserDto), registerUserController)

  router.post(API_ROUTES.USER.LOGIN, validateBody(LoginUserDto), loginUserController)

  router.put(
    API_ROUTES.USER.UPDATE_USER,
    authenticate,
    validateParams(UserIdDto),
    validateBody(UpdateUserDto),
    updateUserController,
  )

  return router
}
