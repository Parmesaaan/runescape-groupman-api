import { HttpStatusCode } from 'axios'
import { RequestHandler, Request, Response } from 'express'

export const healthController: RequestHandler = (req: Request, res: Response) => {
    return res.sendStatus(HttpStatusCode.Ok)
}
