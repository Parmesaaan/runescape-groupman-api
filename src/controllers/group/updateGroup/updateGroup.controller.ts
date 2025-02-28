import {Request, RequestHandler, Response} from "express";
import {GroupIdDto} from "../__common";
import {OperationResult} from "../../../types";
import {GroupService} from "../../../services";
import {isOpFailure} from "../../../utils";
import {HttpStatusCode} from "axios";
import {UpdateGroupDto} from "./updateGroup.dto";

export const updateGroupController: RequestHandler = async (req: Request, res: Response) => {
  const groupId = (req.params as unknown as GroupIdDto).groupId
  const request = req.body as unknown as UpdateGroupDto
  const result: OperationResult = await GroupService.updateGroup(req.user!.id, groupId, request)

  if (isOpFailure(result)) {
    return res.status(result.error!.status).send({ message: result.error!.message })
  }

  return res.status(HttpStatusCode.Ok).send()
}