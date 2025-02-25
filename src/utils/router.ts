import {Express} from "express"
import {groupRouter, systemRouter, userRouter} from "../routes"

export const configureRoutes = (app: Express): void => {
    app.use(systemRouter())
    app.use(userRouter())
    app.use(groupRouter())
}