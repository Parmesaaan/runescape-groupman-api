import { CreateGroupDto, GroupIdDto, JoinRequestDto, UpdateGroupDto } from '../controllers'
import { OperationResult } from '../types'
import { GroupRepository, JoinRequestRepository, MembershipRepository, UserRepository } from '../config'
import { opFailure, opSuccess } from '../utils'
import { HttpStatusCode } from 'axios'
import { Group, GroupNote, JoinRequest, JoinRequestStatus, Membership, Role } from '../models'

export class GroupService {
  public static async createGroup(
    userId: string,
    request: CreateGroupDto,
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId }, relations: ['memberships'] })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    if (await GroupRepository.exists({ where: { name: request.name } })) {
      return opFailure(HttpStatusCode.Conflict, `Group with name ${request.name} already exists`)
    }

    const note = new GroupNote()
    note.author = user
    note.title = `${request.name} is born!`
    note.contents = `Today, ${user.username} founded ${request.name}.`

    const group = new Group()
    group.name = request.name
    group.notes = [note]

    const savedGroup = await GroupRepository.save(group)

    const membership = new Membership()
    membership.user = user
    membership.group = savedGroup
    membership.role = Role.OWNER

    await MembershipRepository.save(membership)
    return opSuccess(savedGroup)
  }

  public static async updateGroup(
    userId: string,
    groupId: string,
    request: UpdateGroupDto,
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({
      where: { id: groupId },
      relations: ['memberships', 'memberships.user'],
    })
    if (!group || !group.memberships)
      return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    const userMembership = group.memberships.find((m) => m.user?.id === user.id)
    if (!userMembership) {
      return opFailure(HttpStatusCode.Forbidden, `User ${user.id} is not in group ${group.id}`)
    }
    if (userMembership.role <= Role.USER) {
      return opFailure(HttpStatusCode.Forbidden, `Only admins or above can edit a group`)
    }

    if (request.ownerId) {
      const queryRunner = GroupRepository.manager.connection.createQueryRunner()
      await queryRunner.startTransaction()

      try {
        if (userMembership.role !== Role.OWNER) {
          return opFailure(HttpStatusCode.Forbidden, `Only the owner can transfer ownership`)
        }

        const newOwner = await UserRepository.findOne({ where: { id: request.ownerId } })
        if (!newOwner)
          return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${request.ownerId}`)

        const newOwnerMembership = group.memberships.find((m) => m.user?.id === request.ownerId)
        if (!newOwnerMembership)
          return opFailure(HttpStatusCode.Forbidden, `New owner must be a member of the group`)

        userMembership.role = Role.ADMIN
        newOwnerMembership.role = Role.OWNER

        await queryRunner.manager.save(userMembership)
        await queryRunner.manager.save(newOwnerMembership)
        await queryRunner.commitTransaction()
      } catch (e) {
        await queryRunner.rollbackTransaction()
        return opFailure()
      } finally {
        await queryRunner.release()
      }
    }

    if (request.name) {
      group.name = request.name
      const savedGroup = await GroupRepository.save(group)
      return opSuccess(savedGroup)
    }

    return opSuccess(group)
  }

  public static async joinGroup(userId: string, request: GroupIdDto): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({ where: { id: request.groupId } })
    if (!group)
      return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${request.groupId}`)

    const existingMembership = await MembershipRepository.findOne({
      where: {
        user: { id: userId },
        group: { id: request.groupId },
      },
    })
    if (existingMembership)
      return opFailure(HttpStatusCode.Conflict, `User is already a member of the group`)

    const joinRequest = new JoinRequest()
    joinRequest.user = user
    joinRequest.group = group
    joinRequest.status = JoinRequestStatus.PENDING

    const savedJoinRequest = await JoinRequestRepository.save(joinRequest)
    if (!savedJoinRequest) return opFailure()
    return opSuccess(savedJoinRequest)
  }

  public static async leaveGroup(userId: string, groupId: string): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const group = await GroupRepository.findOne({
      where: { id: groupId },
      relations: ['memberships', 'memberships.user'],
    })
    if (!group || !group.memberships)
      return opFailure(HttpStatusCode.NotFound, `Cannot find group with id ${groupId}`)

    const userMembership = group.memberships.find((m) => m.user?.id === user.id)
    if (!userMembership) {
      return opFailure(
        HttpStatusCode.BadRequest,
        `User ${user.username} is not in group ${group.name}`,
      )
    }

    const queryRunner = GroupRepository.manager.connection.createQueryRunner()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.remove(userMembership)
      group.memberships = group.memberships?.filter((m) => m.user?.id !== user.id)

      if (!group.memberships.length) {
        await queryRunner.manager.delete(Group, group.id)
        await queryRunner.commitTransaction()
        return opSuccess(null)
      }

      if (userMembership.role === Role.OWNER) {
        let newOwnerMembership = group.memberships?.find((m) => m.role === Role.ADMIN)
        if (!newOwnerMembership) newOwnerMembership = group.memberships[0]

        newOwnerMembership.role = Role.OWNER
        await queryRunner.manager.save(newOwnerMembership)
      }

      await queryRunner.commitTransaction()
      return opSuccess(true)
    } catch (e) {
      await queryRunner.rollbackTransaction()
      return opFailure()
    } finally {
      await queryRunner.release()
    }
  }

  public static async finalizeJoinRequest(
    userId: string,
    request: JoinRequestDto,
  ): Promise<OperationResult> {
    const user = await UserRepository.findOne({ where: { id: userId } })
    if (!user) return opFailure(HttpStatusCode.NotFound, `Cannot find user with id ${userId}`)

    const joinRequest = await JoinRequestRepository.findOne({
      where: { id: request.joinRequestId },
      relations: ['user', 'group'],
    })
    if (!joinRequest)
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find join request with id ${request.joinRequestId}`,
      )

    const group = await GroupRepository.findOne({
      where: { id: joinRequest.group?.id },
      relations: ['memberships', 'memberships.user'],
    })
    if (!group || !group.memberships)
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find group with id ${joinRequest.group?.id}`,
      )

    if (joinRequest.status != JoinRequestStatus.PENDING) {
      return opFailure(HttpStatusCode.BadRequest, 'Join request already resolved')
    }

    if (joinRequest.status === request.status) {
      return opFailure(HttpStatusCode.BadRequest, 'Join request already has that status')
    }

    const existingMembership = await MembershipRepository.findOne({
      where: { user: { id: joinRequest.user?.id }, group: { id: joinRequest.group?.id } },
    })
    if (existingMembership) {
      joinRequest.status = JoinRequestStatus.DENIED
      await JoinRequestRepository.save(joinRequest)
      return opFailure(HttpStatusCode.Conflict, `User is already a member of the group`)
    }

    const userMembership = group.memberships.find((m) => m.user?.id === user.id)
    if (!userMembership || userMembership.role <= 0) {
      return opFailure(HttpStatusCode.Forbidden, 'Only admins or above can finalize join requests')
    }

    const queryRunner = GroupRepository.manager.connection.createQueryRunner()
    await queryRunner.startTransaction()

    try {
      joinRequest.status = request.status
      const savedJoinRequest = await queryRunner.manager.save(joinRequest)

      if (joinRequest.status == JoinRequestStatus.ACCEPTED) {
        const membership = new Membership()
        membership.user = joinRequest.user
        membership.group = joinRequest.group
        await queryRunner.manager.save(membership)
      }

      await queryRunner.commitTransaction()
      return opSuccess(savedJoinRequest)
    } catch (e) {
      await queryRunner.rollbackTransaction()
      return opFailure()
    } finally {
      await queryRunner.release()
    }
  }
}
