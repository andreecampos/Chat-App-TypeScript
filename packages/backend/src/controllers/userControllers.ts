import { UserItem} from '@chat-app/shared'
import { Request, Response } from 'express'
import { loadUserByUsername, saveUserItem } from '../models/user-repository'


 export const getUsers = async (req: Request, res: Response) => {
    const userItems = await loadUserByUsername()
    console.log('All users', userItems)
    res.send(userItems)
   res.status(200).json({message:'get all users'});
    }


export const createUsers = async (req: Request<UserItem>, res: Response<UserItem[]>) => {
   const userItem = req.body
   const saved = await saveUserItem(userItem)
   console.log('Saved user', saved)

   const userItems = await loadUserByUsername()
   console.log('All user', userItems)
   res.send(userItems)
   
}

