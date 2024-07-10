const DB = require("./db")
const express=require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const userRoute = require("./routes/user")
const tripRoute = require("./routes/trips")


const app=express();
const port=process.env.PORT || 8080;

app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin:"http://localhost:5173",
   credentials: true 
}))

app.use('/users', userRoute)
app.use('/api', tripRoute)

app.listen(port,() =>{
    console.log("running...")
})
