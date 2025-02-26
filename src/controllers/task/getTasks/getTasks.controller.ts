import { Request, RequestHandler, Response } from 'express'
import { GetTasksDto } from './getTasks.dto'
import { OperationResult } from '../../../types'
import { TaskService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { Task } from '../../../models/task.entity'
import { TaskResponseDto } from '../__common'
import { HttpStatusCode } from 'axios'

export const getTasksController: RequestHandler = async (req: Request, res: Response) => {
  const request: GetTasksDto = req.body as unknown as GetTasksDto
  const result: OperationResult = await TaskService.getTasks(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const tasks = result.success!.data as Array<Task>
  const response = tasks.map((task) => new TaskResponseDto(task))
  return res.status(HttpStatusCode.Ok).json(response)
}
