import {Router} from "express";
import {API_ROUTES} from "../config";
import {validateBody} from "../utils";
import {LoginDTO, RegisterDTO, userLoginController, userRegisterController} from "../controllers";
import {ChangePasswordDTO, userChangePasswordController} from "../controllers/user/changePassword";

export const userRouter = (): Router => {
    const router = Router()

    router.post(
        API_ROUTES.USER.REGISTER,
        validateBody(RegisterDTO),
        userRegisterController
    )

    router.post(
        API_ROUTES.USER.LOGIN,
        validateBody(LoginDTO),
        userLoginController
    )

    router.post(
        API_ROUTES.USER.CHANGE_PASSWORD,
        validateBody(ChangePasswordDTO),
        userChangePasswordController
    )

    return router
}