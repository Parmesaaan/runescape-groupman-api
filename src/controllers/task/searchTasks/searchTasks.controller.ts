import { Request, RequestHandler, Response } from 'express'
import { SearchTasksDto } from './searchTasks.dto'
import { OperationResult } from '../../../types'
import { TaskService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { Task } from '../../../models/task.entity'
import { TaskResponseDto } from '../__common'
import { HttpStatusCode } from 'axios'

export const searchTasksController: RequestHandler = async (req: Request, res: Response) => {
  const request: SearchTasksDto = req.body as unknown as SearchTasksDto
  const result: OperationResult = await TaskService.getTasks(request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const tasks = result.success!.data as Array<Task>
  const response = tasks.map((task) => new TaskResponseDto(task))
  return res.status(HttpStatusCode.Ok).json(response)
}
