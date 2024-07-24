//const express = require('express')
import express from 'express' // to use this we need to  set "type": "module" in the package.json or use the .mjs extension.
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import msgroutes from './routes/msgRoutes.js'
import connettomongo from './db/connecttomongo.js';
import userRoutes from './routes/uerroutes.js'
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 6000

dotenv.config();

// app.get('/',(req,res)=>{
//     res.send('Hello')
// })

app.use(express.json()) // to parse the incoming requests with JSON payloads from req.body 
app.use(cookieParser()) // to parse the incoming cookies from req.cookies 

app.use('/api/auth',authRoutes) //after /api/auth it will go in auth.routes.js 
app.use('/api/msg',msgroutes) 
app.use('/api/users',userRoutes) 

app.listen(PORT,()=>{ // this is run as soon as server starts 
    connettomongo()
    console.log(`server running on ${PORT}` // we will make change in package.json in scripts to be able to run server.js on commnd npm run server in terminal
)}) 
