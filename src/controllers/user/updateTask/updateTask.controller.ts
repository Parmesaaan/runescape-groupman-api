import { Request, RequestHandler, Response } from 'express'
import { TaskDto, TaskIdDto, TaskResponseDto } from '../__common'
import { TaskService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { Task } from '../../../models'

export const updateTaskController: RequestHandler = async (req: Request, res: Response) => {
  const taskIdDto = req.params as unknown as TaskIdDto
  const request = req.body as unknown as TaskDto
  const result = await TaskService.updateTask(req.user!.id, taskIdDto.taskId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const response = new TaskResponseDto(result.success!.data as Task)
  return res.status(HttpStatusCode.Created).json(response)
}
