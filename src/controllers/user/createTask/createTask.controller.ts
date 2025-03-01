import {Request, RequestHandler, Response} from "express";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {TaskDto} from "../__common/task.dto";
import {TaskService} from "../../../services/task.service";

export const createTaskController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as TaskDto
  const result = await TaskService.createTask(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Created).send()
}
