const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DataSchema = new Schema(
	{
		id : Number,
		message : String,
		email : String,
		username : String,
		site: String,
	},
	{timestamp : true},
);

module.exports  = mongoose.model("Message" , DataSchema);