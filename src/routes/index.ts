import {Express} from "express";
import {systemRouter} from "./system.routes";
import {userRouter} from "../models";

export const configureRoutes = (app: Express): void => {
    app.use(systemRouter())
    app.use(userRouter())
}