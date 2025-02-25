import { Request, RequestHandler, Response } from "express";
import {CreateTaskDTO} from "./createTask.dto";
import {OperationResult} from "../../../types";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {TaskService} from "../../../services";

export const createTaskController: RequestHandler = async(req: Request, res: Response) => {
    const request: CreateTaskDTO = req.body as unknown as CreateTaskDTO
    const result: OperationResult = await TaskService.createTask(request)

    if (isOpFailure(result)) {
        return res
            .status(result.error!.status)
            .send({ message: result.error!.message });
    }

    return res.status(HttpStatusCode.Created).send({
        message: `Task created for ${request.group ? "group " + request.group : "user " + request.user} with title ${request.title}`,
    });
}