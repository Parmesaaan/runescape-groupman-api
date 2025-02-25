import {CreateTaskDto, TaskIdDto, UpdateTaskDto} from "../controllers"
import {OperationResult} from "../types"
import {Task} from "../models/task.entity"
import {GroupRepository, TaskRepository, UserRepository} from "../config"
import {opFailure, opSuccess} from "../utils"
import {HttpStatusCode} from "axios"

export class TaskService {
    public static async createTask(request: CreateTaskDto): Promise<OperationResult> {
        const task = new Task()
        task.title = request.title
        task.description = request.description
        task.taskType = request.taskType

        if(!!request.groupId === !!request.userId) {
            return opFailure(HttpStatusCode.BadRequest, "Exactly one of `groupId` or `userId` must be defined.")
        }

        if (request.groupId) {
            const group = await GroupRepository.findOne({
                where: { id: request.groupId },
                relations: ["users"],
            })
            if (!group) {
                return opFailure(
                    HttpStatusCode.NotFound,
                    `Cannot find task with id ${request.groupId}`,
                )
            }

            task.group = group
        }

        if (request.userId) {
            const user = await UserRepository.findOne({
                where: { id: request.userId },
            })
            if (!user) {
                return opFailure(
                    HttpStatusCode.NotFound,
                    `Cannot find user with id ${request.userId}`,
                )
            }

            task.user = user
        }

        const savedTask = await TaskRepository.save(task)
        if (!savedTask) return opFailure()

        return opSuccess(savedTask)
    }

    public static async updateTask(taskIdDto: TaskIdDto, request: UpdateTaskDto): Promise<OperationResult> {
        const task = await TaskRepository.findOne({ where: {id: taskIdDto.taskId} })

        if (!task) {
            return opFailure(HttpStatusCode.NotFound, `Cannot find task`)
        }

        task.title = request.title ?? task.title
        task.description = request.description ?? task.description

        if (request.completed === true) {
            task.lastCompleted = new Date()
        }

        const savedTask = await TaskRepository.save(task)
        if (!savedTask) return opFailure()

        return opSuccess(savedTask)
    }
}