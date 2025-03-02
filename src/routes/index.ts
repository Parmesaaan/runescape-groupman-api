import { Express } from 'express'
import { systemRouter } from './system.routes'
import { userRouter } from './user.routes'
import { groupRouter } from './group.routes'

export const configureRoutes = (app: Express): void => {
  app.use(systemRouter())
  app.use(userRouter())
  app.use(groupRouter())
}

export * from './system.routes'
export * from './user.routes'
export * from './group.routes'
