import { Router } from "express";
import { API_ROUTES } from "../config";
import { validateBody } from "../utils";
import {
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  userChangePasswordController,
  userLoginController,
  userRegisterController,
} from "../controllers";
import {authenticate} from "../middleware";

export const userRouter = (): Router => {
  const router = Router();

  router.post(
    API_ROUTES.USER.REGISTER,
    validateBody(RegisterDTO),
    userRegisterController,
  );

  router.post(
    API_ROUTES.USER.LOGIN,
    validateBody(LoginDTO),
    userLoginController,
  );

  router.post(
    API_ROUTES.USER.CHANGE_PASSWORD,
    authenticate,
    validateBody(ChangePasswordDTO),
    userChangePasswordController,
  );

  return router;
};