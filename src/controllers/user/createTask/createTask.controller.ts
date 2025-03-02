import { Request, RequestHandler, Response } from 'express'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { TaskDto, TaskResponseDto } from '../__common'
import { TaskService } from '../../../services'
import { Task } from '../../../models'

export const createTaskController: RequestHandler = async (req: Request, res: Response) => {
  const request = req.body as unknown as TaskDto
  const result = await TaskService.createTask(req.user!.id, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new TaskResponseDto(result.success!.data as Task)
  return res.status(HttpStatusCode.Created).json(response)
}
