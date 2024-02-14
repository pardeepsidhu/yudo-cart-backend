const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    user:String,
    products:[
        String
    ]
})
module.exports = mongoose.model('cart',cartSchema)