import { MessageItem} from '@chat-app/shared'
import express, { Router, Request, Response } from 'express'
import { JwtRequest } from "../services/auth";
import { loadMesagges, saveMessage } from '../services/messages-service'

const messageController = express.Router();

messageController.get("/", async (req: Request, res: Response<MessageItem[]>) => {
   res.send(await loadMesagges());
 });

 messageController.post(
   "/",
   async (req: JwtRequest<MessageItem>, res: Response<MessageItem[]>) => {
     try {
       const token = req.jwt 
       if (!token) throw new Error('Missing JWT!')
       res.send(await saveMessage(req.body, token?.sub));
     } catch (e) {
       res.sendStatus(400)
     }
   }
 );
 export default messageController;

//  export const getMessages = async (req: Request, res: Response) => {
//     const messageItems = await loadAllMessagesItems()
//     console.log('All messages', messageItems)
//     res.send(messageItems)
//    res.status(200).json({message:'get all messages'});
//     }


// export const createMessages = async (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
//    const messageItem = req.body
//    const saved = await saveMessageItem(messageItem)
//    console.log('Saved message', saved)

//    const messageItems = await loadAllMessagesItems()
//    console.log('All messages', messageItems)
//    res.send(messageItems)
   
// }

