import { Request, RequestHandler, Response } from 'express'
import { OperationResult } from '../../../types'
import { TaskService } from '../../../services'
import { isOpFailure } from '../../../utils'
import { HttpStatusCode } from 'axios'
import { UpdateTaskDto } from './updateTask.dto'
import { TaskIdDto, TaskResponseDto } from '../__common'
import { Task } from '../../../models/task.entity'

export const updateTaskController: RequestHandler = async (req: Request, res: Response) => {
  const taskIdDto: TaskIdDto = req.params as unknown as TaskIdDto
  const request: UpdateTaskDto = req.body as unknown as UpdateTaskDto
  const result: OperationResult = await TaskService.updateTask(taskIdDto, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  const task = result.success!.data as Task
  const taskResponse: TaskResponseDto = new TaskResponseDto(task)
  return res.status(HttpStatusCode.Ok).json(taskResponse)
}
