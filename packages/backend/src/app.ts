import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import { PORT } from './config/config'


const app: Application = express()

app.use(cors())
app.use(json())

app.use('/api/messages', require('../routes/message'));



// bZgTh4dZw8tnoLfh






app.listen(PORT, function () {
console.log(`App is listening on port ${PORT} !`)
})