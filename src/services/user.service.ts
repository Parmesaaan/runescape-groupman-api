import {OperationResult} from "../types"
import {JWT_SECRET, UserRepository} from "../config"
import {LoginDTO, RegisterDTO} from "../controllers"
import {logger, opFailure, opSuccess} from "../utils"
import {HttpStatusCode} from "axios"
import bcrypt from 'bcrypt'
import {User} from "../models"
import jwt from 'jsonwebtoken'
import {ChangePasswordDTO} from "../controllers/user/changePassword";

export class UserService {
    public static async createUser(request: RegisterDTO): Promise<OperationResult> {
        if(await UserRepository.exists({where: {username: request.username}})) {
            return opFailure(HttpStatusCode.Conflict, `User with username ${request.username} already exists`)
        }

        const newUser = new User()
        newUser.username = request.username
        newUser.password = await bcrypt.hash(request.password, 10)

        const savedUser = await UserRepository.save(newUser)
        if (!savedUser) return opFailure()

        return opSuccess(savedUser)
    }

    public static async loginUser(request: LoginDTO): Promise<OperationResult> {
        const user = await UserRepository.findOne({where: {username: request.username}})
        if (!user){
            return opFailure(HttpStatusCode.NotFound, `Cannot find user with username ${request.username}`)
        }

        const passwordMatch = await bcrypt.compare(request.password, user.password)
        if (!passwordMatch) {
            return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)
        }

        const token = jwt.sign({userId: user.id }, JWT_SECRET, { expiresIn: '1h'})
        return opSuccess({user: user, token: token} as {user: User, token:string})
    }

    static async changePassword(request: ChangePasswordDTO): Promise<OperationResult> {
        const user = await UserRepository.findOne({where: {username: request.username}})
        if (!user){
            return opFailure(HttpStatusCode.NotFound, `Cannot find user with username ${request.username}`)
        }

        const passwordMatch = await bcrypt.compare(request.password, user.password)
        if (!passwordMatch) {
            return opFailure(HttpStatusCode.Unauthorized, `Incorrect password`)
        }

        user.password = await bcrypt.hash(request.newPassword, 10)
        const updatedUser = await UserRepository.save(user)
        if (!updatedUser) return opFailure()

        return opSuccess(updatedUser)
    }
}