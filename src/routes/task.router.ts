import {Router} from "express";
import {API_ROUTES} from "../config";
import {authenticate} from "../middleware";
import {validateBody, validateParams} from "../utils";
import {CreateTaskDTO, createTaskController, TaskIdDTO, updateTaskController, UpdateTaskDTO} from "../controllers";

export const taskRouter = (): Router => {
    const router = Router()

    router.post(
        API_ROUTES.TASK.CREATE,
        authenticate,
        validateBody(CreateTaskDTO),
        createTaskController
    )

    router.post(
        API_ROUTES.TASK.UPDATE,
        authenticate,
        validateParams(TaskIdDTO),
        validateBody(UpdateTaskDTO),
        updateTaskController
    )

    return router
}