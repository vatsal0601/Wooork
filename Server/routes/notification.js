const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

const getNotificationByUserId = async (req, res, next) => {
	let notification;
	try {
		notification = await Notification.findOne({ user_id: req.params.user_id });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.notification = notification;
	next();
};

// Creating/Updating notification
router.post("/:user_id", async (req, res, next) => {
	let notification;
	try {
		notification = await Notification.findOne({ user_id: req.params.user_id });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	if (notification == null) {
		notification = new Notification({
			user_id: req.body.user_id,
			notification: req.body.notification,
		});
	} else {
		try {
			notification = await Notification.findAndModify(
				{ user_id: req.body.user_id },
				{ $push: { notification: req.body.notification } }
			);
		} catch (err) {
			return res.status(500).json({ message: err });
		}
	}
	try {
		const newNotification = await notification.save();
		res.status(201).json(newNotification);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

// Get project by id
router.get("/:user_id", getNotificationByUserId, (req, res, next) => {
	if (res.notification != null) res.json(res.notification);
	else res.json({ message: "Zero notifications" });
});

module.exports = router;
