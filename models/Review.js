const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
	user:String,
	product:String,
	body:String,
	rate:Number
})

module.exports = mongoose.model("reviews",ReviewSchema);