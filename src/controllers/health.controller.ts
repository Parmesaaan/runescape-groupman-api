import { HttpStatusCode } from 'axios'
import { RequestHandler } from 'express'

export const healthController: RequestHandler = (req, res) => {
    return res.sendStatus(HttpStatusCode.Ok)
}
