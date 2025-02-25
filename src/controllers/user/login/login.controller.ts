import {RequestHandler, Request, Response} from "express";
import {LoginDTO} from "./login.dto";
import {UserService} from "../../../services/user.service";
import {OperationResult} from "../../../types";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";

export const userLoginController: RequestHandler = async(req: Request, res, Response) => {
    const request: LoginDTO = (req.body as unknown) as LoginDTO
    const result: OperationResult = await UserService.loginUser(request)

    if(isOpFailure(result)) {
        return res.status(result.error!.status).send({message: result.error!.message})
    }

    return res.status(HttpStatusCode.Ok)
}