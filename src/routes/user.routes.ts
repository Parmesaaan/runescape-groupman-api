import {Router} from "express";
import {API_ROUTES} from "../config";
import {validateBody} from "../utils";
import {LoginDTO, RegisterDTO, userLoginController, userRegisterController} from "../controllers";

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

    return router
}