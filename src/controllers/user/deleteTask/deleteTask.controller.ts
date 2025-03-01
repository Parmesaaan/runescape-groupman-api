import {Request, RequestHandler, Response} from "express"
import {isOpFailure} from "../../../utils"
import {HttpStatusCode} from "axios"
import {TaskIdDto} from "../__common/task.dto"
import {TaskService} from "../../../services/task.service"

export const deleteTaskController: RequestHandler = async (req: Request, res: Response) => {
  const taskIdDto = req.params as unknown as TaskIdDto
  const result = await TaskService.deleteTask(req.user!.id, taskIdDto.taskId)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({message: result.error!.message})
  }

  return res.status(HttpStatusCode.NoContent).send()
}