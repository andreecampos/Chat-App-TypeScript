import dotenv from 'dotenv'

dotenv.config()



export const PORT: number = parseInt(process.env.SERVER_PORT || '3001')