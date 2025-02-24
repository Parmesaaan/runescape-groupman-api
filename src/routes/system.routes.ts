import {Router} from "express";
import {API_ROUTES} from "../config";
import {healthController} from "../controllers";

export const systemRouter = (): Router => {
    const router = Router()

    /**
     * @swagger
     * /:
     *  get:
     *    summary: Root
     *    tags: [System]
     *    responses:
     *      200:
     *        description: OK
     */

    router.get(
        API_ROUTES.ROOT,
        healthController
    )

    return router
}