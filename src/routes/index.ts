import {Express} from "express";
import {systemRouter} from "./system.routes";

export const configureRoutes = (app: Express): void => {
    app.use(systemRouter())
}