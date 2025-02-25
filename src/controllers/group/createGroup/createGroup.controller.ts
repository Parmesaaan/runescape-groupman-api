import { Request, RequestHandler, Response } from "express";
import { CreateGroupDTO } from "./createGroup.dto";
import { OperationResult } from "../../../types";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { GroupService } from "../../../services";

export const createGroupController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: CreateGroupDTO = req.body as unknown as CreateGroupDTO;
  const result: OperationResult = await GroupService.createGroup(request);

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message });
  }

  return res
    .status(HttpStatusCode.Created)
    .send({ message: `Group created with name ${request.name}` });
};