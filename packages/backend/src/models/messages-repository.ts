import { MessageItem}  from '@chat-app/shared'
import { connect, model, Schema } from "mongoose"

const MessageSchema = new Schema({
    userName: String,
    text: String,
    timeStamp: Date
})


const MessageModel = model<MessageItem>('MessageItem', MessageSchema)


export const setupMongoDb = async (url: string)=> {
    await connect(url)
}

export const loadAllMessagesItems = async (): Promise<MessageItem[]> => {
    return MessageModel.find({}).exec()
}

export const saveMessageItem = async (messageItem: MessageItem): Promise<void> =>{
    const newModel = new MessageModel(messageItem)
    newModel.save()
} 

 