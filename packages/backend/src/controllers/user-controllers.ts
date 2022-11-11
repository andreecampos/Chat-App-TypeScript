import { UserItem } from '@chat-app/shared'
import express, { Request, Response } from "express"
import { saveUsuarioItem } from '../services/user-service'



const UserController = express.Router()

UserController.post("/", async (req: Request<UserItem>, res: Response<void>) => {
    try {
        res.send(await saveUsuarioItem(req.body))
    } catch (e) {
        res.sendStatus(400)
    }
})



export default UserController