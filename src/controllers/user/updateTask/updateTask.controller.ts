import { Request, RequestHandler, Response } from 'express'
import { TaskDto, TaskIdDto } from '../__common'
import { TaskService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'

export const updateTaskController: RequestHandler = async (req: Request, res: Response) => {
  const taskIdDto = req.params as unknown as TaskIdDto
  const request = req.body as unknown as TaskDto
  const result = await TaskService.updateTask(req.user!.id, taskIdDto.taskId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Created).send()
}
