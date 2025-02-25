import { CreateGroupDto, GroupIdDto, UserIdDto } from '../controllers'
import { OperationResult } from '../types'
import { GroupRepository, UserRepository } from '../config'
import { opFailure, opSuccess } from '../utils'
import { HttpStatusCode } from 'axios'
import { Group } from '../models'
import { In } from 'typeorm'

export class GroupService {
  public static async createGroup(request: CreateGroupDto): Promise<OperationResult> {
    if (await GroupRepository.exists({ where: { name: request.name } })) {
      return opFailure(HttpStatusCode.Conflict, `Group with name ${request.name} already exists`)
    }

    const users = await UserRepository.findBy({
      username: In(request.users),
    })
    if (!users || !users.length) {
      return opFailure(HttpStatusCode.NotFound, `No users provided exist`)
    }

    const newGroup = new Group()
    newGroup.name = request.name
    newGroup.users = users

    const savedGroup = await GroupRepository.save(newGroup)
    if (!savedGroup) return opFailure()

    return opSuccess(savedGroup)
  }

  public static async joinGroup(groupIdDto: GroupIdDto, request: UserIdDto): Promise<OperationResult> {
    const group = await GroupRepository.findOne({
      where: { id: groupIdDto.groupId },
      relations: ['users'],
    })

    if (!group) {
      return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupIdDto.groupId}`)
    }

    const user = await UserRepository.findOne({
      where: { id: request.userId },
    })
    if (!user) {
      return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${request.userId}`)
    }

    if (group.users.map((user) => user.id).includes(user.id)) {
      return opFailure(HttpStatusCode.AlreadyReported, `User ${user.username} is already in group ${group.name}`)
    }

    group.users = [...group.users, user]

    const savedGroup = await GroupRepository.save(group)
    if (!savedGroup) return opFailure()

    return opSuccess(savedGroup)
  }

  public static async leaveGroup(groupIdDto: GroupIdDto, request: UserIdDto): Promise<OperationResult> {
    const group = await GroupRepository.findOne({
      where: { id: groupIdDto.groupId },
      relations: ['users'],
    })

    if (!group) {
      return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupIdDto.groupId}`)
    }

    const user = await UserRepository.findOne({
      where: { id: request.userId },
    })
    if (!user) {
      return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${request.userId}`)
    }

    if (!group.users.map((user) => user.id).includes(user.id)) {
      return opFailure(HttpStatusCode.BadRequest, `User ${user.username} is not in group ${group.name}`)
    }

    group.users = group.users.filter((u) => u.id !== user.id)

    const savedGroup = await GroupRepository.save(group)
    if (!savedGroup) return opFailure()

    return opSuccess(savedGroup)
  }
}
