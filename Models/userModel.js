var mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    userName : {
        type:String,
        required:[true,"userName needed"]
    },
    email:{
        type:String,
        required:[true,"email needed"]
    },
    mobile:{
        type:String,
        required:[true,"mobile needed"]
    },
    password:{
        type:String,
        required:[true,"password needed"]
    }
})
module.exports = mongoose.model('users',userSchema);