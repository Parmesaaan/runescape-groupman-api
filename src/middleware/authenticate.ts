import {NextFunction, Request, Response} from 'express';
import {isOpFailure, verifyAccessToken} from "../utils";
import {PermissionLevel, User} from "../models";

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}

export const authenticate = (requiredPermissionLevel: PermissionLevel) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return res.status(401).json({message: 'Authentication token required.'})

    const verifyOperation = verifyAccessToken(token)
    const user: User = verifyOperation.success?.data as User

    if (isOpFailure(verifyOperation) || !user.id || !user.permissionLevel) {
      return res.status(403).json({message: 'Invalid or expired token'})
    }

    if ((user.permissionLevel < requiredPermissionLevel) && (requiredPermissionLevel != PermissionLevel.NONE)) {
      return res.status(403).json({message: 'You do not have permission to access this resource.'})
    }

    req.user = user
    next()
  }
}
