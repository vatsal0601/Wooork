const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	owner_name: {
		type: String,
		required: true,
	},
	project_name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	url: {
		type: String,
	},
	tag: [String],
	collaborators: [
		{
			user_id: String,
			name: String,
			role: String,
		},
	],
	image: { type: String },
	project_status: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);
