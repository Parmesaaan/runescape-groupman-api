import { Request, RequestHandler, Response } from "express"
import {CreateTaskDto} from "./createTask.dto"
import {OperationResult} from "../../../types"
import {isOpFailure} from "../../../utils"
import {HttpStatusCode} from "axios"
import {TaskService} from "../../../services"
import {Task} from "../../../models/task.entity"
import {TaskResponseDto} from "../common"

export const createTaskController: RequestHandler = async(req: Request, res: Response) => {
    const request: CreateTaskDto = req.body as unknown as CreateTaskDto
    const result: OperationResult = await TaskService.createTask(request)

    if (isOpFailure(result)) {
        return res
            .status(result.error!.status)
            .send({ message: result.error!.message })
    }

    const task = result.success!.data as Task
    const taskResponse: TaskResponseDto = new TaskResponseDto(task)
    return res.status(HttpStatusCode.Created).json(taskResponse)
}