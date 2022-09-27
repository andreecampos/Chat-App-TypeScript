const express = require('express');
const routes = express.Router();
import { Request, Response } from 'express'



routes.get('/', (req: Request, res: Response) => {
    res.json({message:'get all messages'})
    })
    
routes.post('/', (req: Request, res: Response) => {
    res.json({message:'Create  messages'})
    })


module.exports= routes;