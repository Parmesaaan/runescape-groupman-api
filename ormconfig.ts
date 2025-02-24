require('dotenv').config({ path: __dirname + '/../.env' })

import { DataSource } from 'typeorm'
import { dbConfig } from './src/config'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/src/models/*.entity.{js,ts}'],
  logging: dbConfig.logging,
  synchronize: false,
  migrationsRun: false,
  migrations: ['./database/migrations/*.{js,ts}'],
  migrationsTableName: '__migrations',
})
