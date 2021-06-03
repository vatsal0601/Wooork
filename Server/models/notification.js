const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	project_id: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	project_status: { type: String },
});

module.exports = mongoose.model("Notification", notificationSchema);
