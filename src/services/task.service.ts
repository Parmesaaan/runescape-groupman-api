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
        task.taskType = request.taskType

        if(!!request.group === !!request.user) {
            return opFailure(HttpStatusCode.BadRequest, "Exactly one of `group` or `user` must be defined.")
        }

        if (task.group) {
            const group = await GroupRepository.findOne({
                where: { name: request.group },
                relations: ["users"],
            })
            if (!group) {
                return opFailure(
                    HttpStatusCode.NotFound,
                    `Cannot find task with name ${request.group}`,
                )
            }

            task.group = group
        }

        if (task.user) {
            const user = await UserRepository.findOne({
                where: { username: request.user },
            })
            if (!user) {
                return opFailure(
                    HttpStatusCode.NotFound,
                    `Cannot find user with username ${request.user}`,
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