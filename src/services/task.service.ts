import { OperationResult } from '../types'
import { TaskDto } from '../controllers'
import { TaskRepository, UserRepository } from '../config'
import { opFailure, opSuccess } from '../utils'
import { HttpStatusCode } from 'axios'
import { Task } from '../models'

export class TaskService {
  public static async createTask(userId: string, request: TaskDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const task = new Task()
    task.title = request.title
    task.description = request.description
    task.taskType = request.taskType
    task.user = user

    const savedTask = await TaskRepository.save(task)
    return opSuccess(savedTask)
  }

  public static async updateTask(
    userId: string,
    taskId: string,
    request: TaskDto,
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const task = await TaskRepository.findOne({ where: { id: taskId }, relations: ['user'] })
    if (!task) return opFailure(HttpStatusCode.NotFound, `Cannot find task with id ${taskId}`)

    if (task.user.id != user.id)
      return opFailure(HttpStatusCode.Forbidden, `You can only change your own tasks`)

    task.title = request.title ?? task.title
    task.description = request.description ?? task.description
    task.taskType = request.taskType ?? task.taskType

    const savedTask = await TaskRepository.save(task)
    return opSuccess(savedTask)
  }

  public static async deleteTask(userId: string, taskId: string): Promise<OperationResult> {
    const task = await TaskRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    })

    if (!task)
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find task with id ${taskId} for user ${userId}`,
      )

    await TaskRepository.delete(taskId)
    return opSuccess(true)
  }
}
