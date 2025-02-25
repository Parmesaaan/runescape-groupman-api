import {Express} from "express"
import {systemRouter, userRouter} from "../routes"

export const configureRoutes = (app: Express): void => {
    app.use(systemRouter())
    app.use(userRouter())
}