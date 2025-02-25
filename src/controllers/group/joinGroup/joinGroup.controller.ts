import { Request, RequestHandler, Response } from "express";
import { OperationResult } from "../../../types";
import { GroupService } from "../../../services";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { JoinGroupDto } from "./joinGroup.dto";
import {Group} from "../../../models";
import {GroupResponseDto} from "../common";

export const joinGroupController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: JoinGroupDto = req.body as unknown as JoinGroupDto
  const result: OperationResult = await GroupService.joinGroup(request)

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message })
  }

  const group = result.success!.data as Group
  const response: GroupResponseDto = new GroupResponseDto(group)
  return res.status(HttpStatusCode.Ok).json(response)
};