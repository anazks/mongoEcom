var mongoose = require("mongoose")

const con = ()=>{
      return mongoose.connect("mongodb+srv://anazks:123@cluster0.jxpil.mongodb.net/ecomm?retryWrites=true&w=majority")
}

module.exports = con;