const express=require('express');
const { connection } = require('./Config/db');
const { userRoute } = require('./routes/user.routes');
const app=express()
require('dotenv').config()
const port=process.env.port;
const cors=require('cors');
const { noteRoute } = require('./routes/notes.routes');
const { authMiddleware } = require('./middleware/authmiddleware');
app.use(express.json())
app.use(cors())

app.use("/user",userRoute)
app.use(authMiddleware)
app.use("/notes",noteRoute)

app.listen(port,async()=>{
    try {
        await connection;
        console.log('Connection is established between index.js and database')
    } catch (error) {
        console.log('Connection is not established between index.js and database')
    }
    console.log(`Serever is connected to ${port}`)
})