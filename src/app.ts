import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import {API_ROUTES} from "./config";
import {swaggerConfig} from "./config";
import {setContentTypePolicy} from "./middleware";
import {configureRoutes} from "./routes";

const initApp = () => {
  const app = express()

  if(process.env.NODE_ENV !== 'production') {
    const swaggerSpec = swaggerJsDoc(swaggerConfig)
    app.use(API_ROUTES.SWAGGER, swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  }

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
  app.use(bodyParser.urlencoded({extended: true}))
  configureRoutes(app)
  // TODO: Exception handling?

  return app
}

export { initApp }