const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	notification: [
		{
			project: {
				id: {
					type: String,
				},
				name: {
					type: String,
				},
			},
			description: {
				type: String,
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
