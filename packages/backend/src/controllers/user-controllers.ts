import { UserItem } from '@chat-app/shared'
import express, { Request, Response } from "express"
import { checkUser } from '../models/user-repository'
import { saveUsuarioItem } from '../services/user-service'



const UserController = express.Router()

UserController.post("/", async (req: Request<UserItem>, res: Response<void>) => {
    try {
        res.send(await saveUsuarioItem(req.body))
    } catch (e) {
        res.sendStatus(400)
    }
})

UserController.post(
    "/login",
    async (req: Request<UserItem>, res: Response) => {
        const reqBody = req.body;
        const getValidUser = await checkUser(reqBody);
        res.send(getValidUser);
    }
);

export default UserController