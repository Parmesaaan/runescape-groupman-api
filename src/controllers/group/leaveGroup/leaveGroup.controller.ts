import { Request, RequestHandler, Response } from "express";
import { OperationResult } from "../../../types";
import { GroupService } from "../../../services";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { LeaveGroupDto } from "./leaveGroup.dto";
import {Group} from "../../../models";
import {GroupResponseDto} from "../common";

export const leaveGroupController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: LeaveGroupDto = req.body as unknown as LeaveGroupDto
  const result: OperationResult = await GroupService.leaveGroup(request)

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message })
  }

  const group = result.success!.data as Group
  const response: GroupResponseDto = new GroupResponseDto(group)
  return res.status(HttpStatusCode.Ok).json(response)
}