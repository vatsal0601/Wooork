const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	notification: [
		{
			project_id: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			sender_info: {
				id: {
					type: String,
				},
				name: {
					type: String,
				},
			},
		},
	],
});

module.exports = mongoose.model("Notification", notificationSchema);
