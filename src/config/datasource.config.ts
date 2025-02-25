import {DataSource} from "typeorm";
import {dbConfig} from "./environment.config";
import {User} from "../models";

export const AppDataSource = new DataSource({
    ...dbConfig,
    type: 'postgres',
    synchronize: false,
    logging: dbConfig.logging,
    entities: [__dirname + '/../models/*.entity.{js,ts}'],
    subscribers: [],
    migrations: [],
    extra: {
        query_timeout: 10000,
        connectionLimit: 50,
    },
})

export const UserRepository = AppDataSource.getRepository(User)