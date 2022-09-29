const express = require('express');
const router = express.Router();
const {getMessages, createMessages} = require ('../src/controllers/messageControllers')




router.get('/', getMessages)
router.post('/', createMessages)



module.exports= router; 