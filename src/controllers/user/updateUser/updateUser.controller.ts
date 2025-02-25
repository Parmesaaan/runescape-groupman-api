import { Request, RequestHandler, Response } from "express";
import { OperationResult } from "../../../types";
import { UserService } from "../../../services";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { UpdateUserDto } from "./updateUser.dto";

export const updateUserController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: UpdateUserDto = req.body as unknown as UpdateUserDto;
  const result: OperationResult = await UserService.changePassword(request);

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message });
  }

  return res
    .status(HttpStatusCode.Ok)
    .send({ message: `Changed password for user ${request.username}` });
};