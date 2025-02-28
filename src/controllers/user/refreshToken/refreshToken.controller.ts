import {Request, RequestHandler, Response} from "express";
import {isOpFailure, TokenPair} from "../../../utils";
import {AuthResponseDto} from "../__common";
import {HttpStatusCode} from "axios";
import {RefreshTokenDto} from "./refreshToken.dto";
import {UserService} from "../../../services";

export const refreshTokenController: RequestHandler = async (req: Request, res: Response) => {
    const request = req.body as unknown as RefreshTokenDto
    const result = await UserService.refreshToken(req.user!.id, request)

    if (isOpFailure(result)) {
        return res.status(result.error!.status).send({ message: result.error!.message })
    }

    const tokenPair = result.success!.data as TokenPair
    const response: AuthResponseDto = new AuthResponseDto(tokenPair.token, tokenPair.refresh)
    return res.status(HttpStatusCode.Ok).json(response)
}
