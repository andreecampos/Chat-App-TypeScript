import dotenv from 'dotenv'

dotenv.config()

export const PORT: number = parseInt(process.env.SERVER_PORT || '3001')
export const MONGO_URL: string = process.env.MONGO_URL || 'mongodb+srv://chatapp:bZgTh4dZw8tnoLfh@cluster0.rjtccdb.mongodb.net/chatApp';