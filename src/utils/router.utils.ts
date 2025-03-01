import { Express } from 'express'
import { groupRouter, noteRouter, systemRouter, taskRouter, userRouter } from '../routes'

export const configureRoutes = (app: Express): void => {
  app.use(systemRouter())
  app.use(userRouter())
  app.use(groupRouter())
  app.use(noteRouter())
  app.use(taskRouter())
}
