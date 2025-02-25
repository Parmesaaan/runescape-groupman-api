import {Router} from "express";
import {API_ROUTES} from "../config";
import {healthController} from "../controllers";

export const systemRouter = (): Router => {
    const router = Router()

    router.get(
        API_ROUTES.ROOT,
        healthController
    )

    return router
}