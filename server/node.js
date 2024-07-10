const DB = require("./db")
const express=require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config();
const userRoute = require("./routes/user")
const tripRoute = require("./routes/trips")


const app=express();
const port=8080;

app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin:"http://localhost:5173",
   credentials: true 
}))

app.use('/users', userRoute)
app.use('/api', tripRoute)

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "dist")));
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });

app.listen(port,() =>{
    console.log("running...")
})
