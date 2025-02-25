import {Request, RequestHandler, Response} from "express"
import {OperationResult} from "../../../types"
import {UserService} from "../../../services/user.service"
import {isOpFailure} from "../../../utils"
import {HttpStatusCode} from "axios"
import {ChangePasswordDTO} from "./changePassword.dto"

export const userChangePasswordController: RequestHandler = async(req: Request, res: Response) => {
    const request: ChangePasswordDTO = (req.body as unknown) as ChangePasswordDTO
    const result: OperationResult = await UserService.changePassword(request)

    if(isOpFailure(result)) {
        return res.status(result.error!.status).send({message: result.error!.message})
    }

    return res.status(HttpStatusCode.Ok).send({message: `Changed password for user ${request.username}`})
}