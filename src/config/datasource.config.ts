import { DataSource } from 'typeorm'
import { dbConfig } from './environment.config'
import { Group, Note, User } from '../models'
import { Task } from '../models/task.entity'

export const AppDataSource = new DataSource({
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

export const UserRepository = AppDataSource.getRepository(User)
export const GroupRepository = AppDataSource.getRepository(Group)
export const NoteRepository = AppDataSource.getRepository(Note)
export const TaskRepository = AppDataSource.getRepository(Task)
