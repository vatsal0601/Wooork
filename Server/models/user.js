const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	social_links: [{ app_name: String, link: String }],
	education: [
		{
			institute_name: String,
			year_of_graduation: Number,
			qualification: String,
			graduation_field: String,
		},
	],
	experience: [{ company_name: String, role: String, duration: String, work_description: String }],
	skills: [String],
});

module.exports = mongoose.model("User", userSchema);
