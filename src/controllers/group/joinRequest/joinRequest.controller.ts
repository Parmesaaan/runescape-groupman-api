import {Request, RequestHandler, Response} from "express";
import {GroupService} from "../../../services";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {GroupIdDto} from "../__common";
import {JoinRequestDto} from "./joinRequest.dto";

export const joinRequestController: RequestHandler = async (req: Request, res: Response) => {
    const groupId = (req.params as unknown as GroupIdDto).groupId
    const { joinRequestId, accept} = (req.query as unknown as JoinRequestDto)
    const result = await GroupService.finalizeJoinRequest(req.user!.id, groupId, joinRequestId, accept)

    if (isOpFailure(result)) return res.status(result.error!.status).send({ message: result.error!.message })

    return res.status(HttpStatusCode.Ok).send()
}