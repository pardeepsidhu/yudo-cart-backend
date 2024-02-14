const mongoose = require("mongoose")
const recentSchema = new mongoose.Schema({
	user:String,
	product:String,
	date:{
		type:Date,
	default:Date.now
	},
	img:String,
	name:String,
	price:String
})

module.exports = mongoose.model('recent',recentSchema)