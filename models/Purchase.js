const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
	user:String,
	product:String,
	date:{
	type:Date,
	default:Date.now
	},
	address:String,
	address2:String,
	number:Number,
	number2:Number
})
module.exports = mongoose.model("purchase",purchaseSchema);