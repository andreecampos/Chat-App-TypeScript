import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import { setupMongoDb } from './models/messages-repository'
import messageControllers from './controllers/messageControllers'
import { authenticateToken, loginUser } from './services/auth'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import { loadUserByUsername, saveUserItem } from './models/user-repository'
import { UserItem } from '@chat-app/shared'
import UserController from './controllers/user-controllers'


dotenv.config();

const app: Application = express()

app.use(cookieParser())
app.use(cors())
app.use(json())

const port: number = parseInt(process.env.SERVER_PORT || "4000");
const mongoUrl: string =
  process.env.MONGODB_URL || "mongodb://db:27017";

app.use("/register", UserController)
app.post("/login", loginUser);
app.use('/api/messages', authenticateToken);
app.use('/api/messages', messageControllers);

export const checkUrl = mongoUrl;

app.listen(port, async function () {
  await setupMongoDb(mongoUrl)
  console.log(`App is listening on port ${port} !`)
})

