import { Request, RequestHandler, Response } from "express";
import { LoginDTO } from "./login.dto";
import { UserService } from "../../../services";
import { OperationResult } from "../../../types";
import { isOpFailure } from "../../../utils";
import { HttpStatusCode } from "axios";
import { User } from "../../../models";

export const userLoginController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const request: LoginDTO = req.body as unknown as LoginDTO;
  const result: OperationResult = await UserService.loginUser(request);

  if (isOpFailure(result)) {
    return res
      .status(result.error!.status)
      .send({ message: result.error!.message });
  }

  const { user, token } = result.success!.data as { user: User; token: string };
  return res.status(HttpStatusCode.Ok).send({ token: token });
};