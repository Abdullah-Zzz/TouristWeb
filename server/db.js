const mongoose = require("mongoose")

const DBurl= "mongodb://127.0.0.1:27017/DB"

const connectDB = mongoose.connect(DBurl)
                  .then(() =>{
                    console.log("connected")
                  })
                  .catch(err =>{
                    console.log("Error: " + err)
                  })
                  
module.exports = connectDB