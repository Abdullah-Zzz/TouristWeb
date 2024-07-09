const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    number:{
        type:Number,
        required : true 
    },
    people:{
        type:Number,
        required: true
    },
    packageName:{
        type:String,    
        required: true
    },
    transportation : {
        type:String,
        required : true
    }
})

module.exports = new mongoose.model('reservations', reservationSchema)