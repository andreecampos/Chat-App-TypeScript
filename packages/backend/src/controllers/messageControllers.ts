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



