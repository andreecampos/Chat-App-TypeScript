import MessageItem from '@chat-app/shared'
import { Request, Response } from 'express'
import { loadAllMessagesItems, saveMessageItem } from '../models/messages-repository'


 const getMessages = async (req: Request, res: Response) => {
    const messageItems = await loadAllMessagesItems()
    console.log('All messages', messageItems)
    res.send(messageItems)
   res.status(200).json({message:'get all messages'});
    }


const createMessages = async (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
   const messageItem = req.body
   const saved = await saveMessageItem(messageItem)
   console.log('Saved message', saved)

   const messageItems = await loadAllMessagesItems()
   console.log('All messages', messageItems)
   res.send(messageItems)
   
   // if(!req.body.text){res.status(400)
        //throw new Error('Text is required'); }
    //res.status(201).json({message:'Create  messages'})
}

module.exports = {getMessages, createMessages};
//me quede en 00:38