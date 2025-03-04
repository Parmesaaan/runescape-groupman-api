import { Group, GroupNote, Task, TaskType, User, UserNote } from '../../../models'

export class UserProfileDto {
  user!: UserProfileUser
  groups!: Array<UserProfileGroup>

  constructor(user: User, groups?: Array<Group>) {
    this.user = new UserProfileUser(user)
    this.groups = groups?.map(g => new UserProfileGroup(g)) || []
  }
}

export class UserProfileUser {
  id!: string
  username!: string
  notes!: Array<UserProfileUserNote>
  tasks!: Array<UserProfileTask>
  createdAt!: Date
  updatedAt!: Date

  constructor(user: User) {
    this.id = user.id
    this.username = user.username
    this.notes = user.notes?.map(n => new UserProfileUserNote(n)) || []
    this.tasks = user.tasks?.map(t => new UserProfileTask(t)) || []
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}

export class UserProfileGroup {
  id!: string
  name!: string
  members!: Array<UserProfileGroupMember>
  notes!: Array<UserProfileGroupNote>
  createdAt!: Date
  updatedAt!: Date

  constructor(group: Group) {
    this.id = group.id
    this.name = group.name
    this.members = group.memberships?.map(m => new UserProfileGroupMember(m.user!)) || []
    this.notes = group.notes?.map(n => new UserProfileGroupNote(n)) || []
    this.createdAt = group.createdAt
    this.updatedAt = group.updatedAt
  }
}

export class UserProfileTask {
  id!: string
  title!: string
  description?: string
  taskType!: TaskType
  lastCompleted?: Date
  createdAt!: Date
  updatedAt!: Date

  constructor(task: Task) {
    this.id = task.id
    this.title = task.title
    this.description = task.description
    this.taskType = task.taskType
    this.lastCompleted = task.lastCompleted ?? undefined
    this.createdAt = task.createdAt
    this.updatedAt = task.updatedAt
  }
}

export class UserProfileUserNote {
  id!: string
  title!: string
  contents!: string
  createdAt!: Date
  updatedAt!: Date

  constructor(note: UserNote) {
    this.id = note.id
    this.title = note.title
    this.contents = note.contents
    this.createdAt = note.createdAt
    this.updatedAt = note.updatedAt
  }
}

export class UserProfileGroupNote {
  id!: string
  title!: string
  contents!: string
  author?: UserProfileGroupMember
  createdAt!: Date
  updatedAt!: Date

  constructor(note: GroupNote) {
    this.id = note.id
    this.title = note.title
    this.contents = note.contents
    this.author = note.author ? new UserProfileGroupMember(note.author) : undefined
    this.createdAt = note.createdAt
    this.updatedAt = note.updatedAt
  }
}

export class UserProfileGroupMember {
  id!: string
  username!: string

  constructor(user: User) {
    this.id = user.id
    this.username = user.username
  }
}