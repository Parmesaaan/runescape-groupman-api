import {Request, RequestHandler, Response} from "express";
import {OperationResult} from "../../../types";
import {GroupService} from "../../../services";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {JoinGroupDTO} from "./joinGroup.dto";

export const groupJoinController: RequestHandler = async(req: Request, res: Response) => {
    const request: JoinGroupDTO = (req.body as unknown) as JoinGroupDTO
    const result: OperationResult = await GroupService.joinGroup(request)

    if(isOpFailure(result)) {
        return res.status(result.error!.status).send({message: result.error!.message})
    }

    return res.status(HttpStatusCode.Created).send({message: `User ${request.user} has joined group ${request.group}`})
}