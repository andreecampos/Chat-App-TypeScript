import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import { PORT, MONGO_URL } from './config/config'
import { setupMongoDb } from './models/messages-repository'


const app: Application = express()

app.use(cors())
app.use(json())

app.use('/api/messages', require('../routes/message'));



// bZgTh4dZw8tnoLfh






app.listen(PORT, async function () {
    await setupMongoDb(MONGO_URL)
console.log(`App is listening on port ${PORT} !`)
})