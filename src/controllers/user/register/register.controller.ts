import {RequestHandler, Request, Response} from "express";
import {RegisterDTO} from "./register.dto";
import {OperationResult} from "../../../types";
import {UserService} from "../../../services/user.service";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";

export const userRegisterController: RequestHandler = async(req: Request, res: Response) => {
    const request: RegisterDTO = (req.body as unknown) as RegisterDTO
    const result: OperationResult = await UserService.createUser(request)

    if(isOpFailure(result)) {
        if(result.error!.status === HttpStatusCode.Conflict) {
            return res.status(HttpStatusCode.Conflict).send('')
        }
        return res.status(result.error!.status).send({message: result.error!.message})
    }

    return res.status(HttpStatusCode.Created).send({message: `User created with username ${request.username}`})
}