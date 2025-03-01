import { DataSource } from 'typeorm'
import { dbConfig } from './environment.config'
import {Group, GroupNote, JoinRequest, User} from '../models'
import { Task } from '../models'
import {UserNote} from "../models";
import {Membership} from "../models/membership.entity";

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
export const UserNoteRepository = AppDataSource.getRepository(UserNote)
export const GroupNoteRepository = AppDataSource.getRepository(GroupNote)
export const TaskRepository = AppDataSource.getRepository(Task)
export const JoinRequestRepository = AppDataSource.getRepository(JoinRequest)
export const MembershipRepository = AppDataSource.getRepository(Membership)
