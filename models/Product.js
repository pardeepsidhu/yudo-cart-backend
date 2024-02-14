const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    img:String,
    company:String,
    price:String,
    rear:String,
    cCount:String,
    front:String,
    display:String,
    resolution:String,
    storage:String,
    ram:String,
    network:String,
    battery:String,
    arch:String,
})

module.exports = mongoose.model('products',productSchema);