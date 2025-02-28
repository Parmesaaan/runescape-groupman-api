import {CreateGroupDto, UpdateGroupDto} from '../controllers'
import {OperationResult} from '../types'
import {GroupRepository, JoinRequestRepository, UserRepository} from '../config'
import {isOpFailure, opFailure, opSuccess} from '../utils'
import {HttpStatusCode} from 'axios'
import {Group, GroupNote, JoinRequest, JoinRequestStatus, PermissionLevel, User} from '../models'

export class GroupService {
  public static async createGroup(userId: string, request: CreateGroupDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId }, relations: ['groups'] })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    if (await GroupRepository.exists({ where: { name: request.name } })) {
      return opFailure(HttpStatusCode.Conflict, `Group with name ${request.name} already exists`)
    }

    if (user.groups && user.groups.length > 3) {
      return opFailure(HttpStatusCode.Forbidden, 'User is already at max groups (3)')
    }

    const note = new GroupNote()
    note.author = user
    note.title = `${request.name} is born!`
    note.contents = `Today, ${user.username} founded ${request.name}.`

    const group = new Group()
    group.name = request.name
    group.owner = user
    group.users = [user]
    group.notes = [note]

    const savedGroup = await GroupRepository.save(group)
    return opSuccess(savedGroup)
  }

  public static async updateGroup(userId: string, groupId: string, request: UpdateGroupDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({ where: { id: groupId } })
    if (!group) return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    if (request.name) group.name = request.name
    if (request.owner) {
      let newOwner = await UserRepository.findOne({ where: { id: request.owner } })
      if (!newOwner) newOwner = await UserRepository.findOne({ where: { username: request.owner } })
      if (!newOwner) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)
      group.owner = newOwner
    }

    const savedGroup = await GroupRepository.save(group)
    return opSuccess(savedGroup)
  }

  public static async joinGroup(userId: string, groupId: string): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId }, relations: ['groups'] })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({ where: { id: groupId }, relations: ['owner', 'users'] })
    if (!group) return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    const groupJoinEligibility = this.checkGroupJoinEligibility(user, group)
    if (isOpFailure(groupJoinEligibility)) return groupJoinEligibility

    const joinRequest = new JoinRequest()
    joinRequest.user = user
    joinRequest.group = group
    joinRequest.status = JoinRequestStatus.PENDING

    const savedJoinRequest = await JoinRequestRepository.save(joinRequest)
    if (!savedJoinRequest) return opFailure()
    return opSuccess(savedJoinRequest)
  }

  public static async leaveGroup(userId: string, groupId: string): Promise<OperationResult> {
    const user = await UserRepository.findOne({where: { id: userId },})
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({where: { id: groupId }, relations: ['users', 'owner']})
    if (!group) return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    if (!group.users.map((user) => user.id).includes(user.id)) {
      return opFailure(HttpStatusCode.BadRequest, `User ${user.username} is not in group ${group.name}`)
    }

    group.users = group.users.filter((u) => u.id !== user.id)

    if (!group.users.length) {
      await GroupRepository.delete(group.id)
      return opSuccess(null)
    }

    if (group.owner.id === user.id) {
      const newOwner = await UserRepository.findOne({where: { id: group.users[0].id }})
      if (!newOwner) return opFailure(HttpStatusCode.InternalServerError, 'Failed to resolve new owner')
      group.owner = newOwner
    }

    const savedGroup = await GroupRepository.save(group)
    if (!savedGroup) return opFailure()
    return opSuccess(savedGroup)
  }

  public static async finalizeJoinRequest(
      userId: string,
      groupId: string,
      joinRequestId: string,
      accepted: boolean
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId }, relations: ['groups'] })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({ where: { id: groupId }, relations: ['owner', 'users'] })
    if (!group) return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    const joinRequest = await JoinRequestRepository.findOne({ where: { id: joinRequestId }, relations: ['user', 'group'] })
    if (!joinRequest) return opFailure(HttpStatusCode.NotFound, `Cannot find join request with id ${joinRequestId}`)

    if (joinRequest.status != JoinRequestStatus.PENDING) {
      return opFailure(HttpStatusCode.BadRequest, 'Join request already resolved')
    }

    if (group.owner.id != user.id) {
      return opFailure(HttpStatusCode.Forbidden, 'Only the owner of a group may finalize join requests')
    }

    const groupJoinEligibility = this.checkGroupJoinEligibility(user, group)
    if (!accepted || isOpFailure(groupJoinEligibility)) {
      joinRequest.status = JoinRequestStatus.DENIED
      await JoinRequestRepository.save(joinRequest)
      return isOpFailure(groupJoinEligibility) ? groupJoinEligibility : opSuccess(joinRequest)
    }

    joinRequest.status = JoinRequestStatus.ACCEPTED
    group.users = [...group.users, user]
    await GroupRepository.save(group)
    return opSuccess(joinRequest)
  }

  private static checkGroupJoinEligibility(user: User, group: Group): OperationResult {
    if (group.users.map((user) => user.id).includes(user.id)) {
      return opFailure(HttpStatusCode.AlreadyReported, `User ${user.username} is already in group ${group.name}`)
    }

    if (user.groups && user.groups.length > 3) {
      return opFailure(HttpStatusCode.Forbidden, 'User is already at max groups (3)')
    }

    if (group.users.length > 5) {
      return opFailure(HttpStatusCode.Forbidden, 'Group is already at max users (5)')
    }

    return opSuccess(true)
  }
}
