import { DataSource } from 'typeorm'
import { dbConfig } from './environment.config'
import { Group, GroupNote, JoinRequest, Membership, Task, User, UserNote } from '../models'

export const Database = new DataSource({
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: dbConfig.logging,
  type: 'postgres',
  synchronize: false,
  entities: [__dirname + '/../models/*.entity.{js,ts}'],
  subscribers: [],
  migrations: [],
  extra: {
    query_timeout: 5000,
    connectionLimit: 10,
  },
})

export const UserRepository = Database.getRepository(User)
export const GroupRepository = Database.getRepository(Group)
export const UserNoteRepository = Database.getRepository(UserNote)
export const GroupNoteRepository = Database.getRepository(GroupNote)
export const TaskRepository = Database.getRepository(Task)
export const JoinRequestRepository = Database.getRepository(JoinRequest)
export const MembershipRepository = Database.getRepository(Membership)
