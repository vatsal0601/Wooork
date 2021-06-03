const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	project_id: [String],
});

module.exports = mongoose.model("Saved", savedSchema);
