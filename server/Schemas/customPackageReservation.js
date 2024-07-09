const mongoose = require("mongoose")

const customPackageSchema = mongoose.Schema({
    userInfo : {
        name : {
            type :String,
            required : true
        },
        phoneNumber : {
            type : Number,
            required : true 
        }
    },
    packageInfo : {
        destination: {type : String , required : true},
        people: {type : Number , required : true},
        rooms: {type : Number , required : true},
        priceExtraRoom: {type : Number , required : true},
        days: {type : Number , required : true},
        date: {type : String , required : true},
        transportation: {type : String , required : true},
        price: {type : Number , required : true}
    }
})

module.exports =new mongoose.model('customPackageSchema', customPackageSchema)