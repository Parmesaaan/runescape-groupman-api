import { Request, RequestHandler, Response } from "express";
import { RegisterUserDto } from "./registerUser.dto";
import { OperationResult } from "../../../types";
import { UserService } from "../../../services";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";

export const registerUserController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: RegisterUserDto = req.body as unknown as RegisterUserDto;
  const result: OperationResult = await UserService.createUser(request);

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message });
  }

  return res
    .status(HttpStatusCode.Created)
    .send({ message: `User created with username ${request.username}` });
};