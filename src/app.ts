import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { errorHandler, logRequest, logResponse, setContentTypePolicy } from './middleware'

import { configureRoutes } from './routes'

const initApp = () => {
  const app = express()

  app.use(
    cors({
      origin: '*',
      methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
      exposedHeaders: ['Authorization', 'Content-Type'],
    }),
  )
  app.use(setContentTypePolicy)
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(logRequest)
  app.use(logResponse)
  configureRoutes(app)
  app.use(errorHandler)

  return app
}

export { initApp }
