import { Request, RequestHandler, Response } from "express";
import { OperationResult } from "../../../types";
import { GroupService } from "../../../services";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { LeaveGroupDTO } from "./leaveGroup.dto";

export const leaveGroupController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: LeaveGroupDTO = req.body as unknown as LeaveGroupDTO;
  const result: OperationResult = await GroupService.leaveGroup(request);

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message });
  }

  return res
    .status(HttpStatusCode.Created)
    .send({ message: `User ${request.user} has left group ${request.group}` });
};