const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first:String,
    last:String,
    email:String,
    number:Number,
    address:String,
    password:String

    
});
module.exports = mongoose.model('Users',userSchema);