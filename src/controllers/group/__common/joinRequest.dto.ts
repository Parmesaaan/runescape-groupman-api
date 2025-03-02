import { JoinRequest, JoinRequestStatus } from '../../../models'

export class JoinRequestResponseDto {
  id!: string
  userId?: string
  groupId?: string
  status!: JoinRequestStatus
  createdAt!: Date
  updatedAt!: Date

  constructor(joinRequest: JoinRequest) {
    this.id = joinRequest.id
    this.userId = joinRequest.user?.id
    this.groupId = joinRequest.group?.id
    this.status = joinRequest.status
    this.createdAt = joinRequest.createdAt
    this.updatedAt = joinRequest.updatedAt
  }
}
