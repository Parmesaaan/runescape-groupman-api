import { Request, RequestHandler, Response } from "express";
import { OperationResult } from "../../../types";
import { UserService } from "../../../services";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { UpdateUserDto } from "./updateUser.dto";
import {User} from "../../../models";
import {UserIdDTO} from "../common";

export const updateUserController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const userIdDto: UserIdDTO = req.params as unknown as UserIdDTO
  const request: UpdateUserDto = req.body as unknown as UpdateUserDto
  const result: OperationResult = await UserService.updateUser(userIdDto, request)

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message })
  }

  return res
    .status(HttpStatusCode.Ok)
    .send({ message: `Changed password for user ${(result.success!.data as User).username}` })
}