import {Request, RequestHandler, Response} from "express";
import {OperationResult} from "../../../types";
import {TaskService} from "../../../services";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {UpdateTaskDTO} from "./updateTask.dto";
import {TaskIdDTO} from "../common";

export const updateTaskController: RequestHandler = async(req: Request, res: Response) => {
    const task: TaskIdDTO = req.params as unknown as TaskIdDTO
    const request: UpdateTaskDTO = req.body as unknown as UpdateTaskDTO
    const result: OperationResult = await TaskService.updateTask(task, request)

    if (isOpFailure(result)) {
        return res
            .status(result.error!.status)
            .send({ message: result.error!.message })
    }

    return res.status(HttpStatusCode.Created).send({
        message: `Task ${request.title} updated`,
    })
}