const express = require("express");
const router = express.Router();
const Saved = require("../models/saved");

const getSavedByUserId = async (req, res, next) => {
	let saved;
	try {
		saved = await Saved.findOne({ user_id: req.params.user_id });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.saved = saved;
	next();
};

// Remove saved project by id
router.post("/remove=:user_id", async (req, res, next) => {
	let saved;
	try {
		saved = await Saved.findOneAndUpdate(
			{ user_id: req.body.user_id },
			{ $pull: { project_id: req.body.project_id } }
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}

	try {
		const newSaved = await saved.save();
		res.status(201).json({ message: "Project Removed" });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

// Creating/Updating saved
router.post("/:user_id", async (req, res, next) => {
	let saved;
	try {
		saved = await Saved.findOne({ user_id: req.params.user_id });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	if (saved == null) {
		saved = new Saved({
			user_id: req.body.user_id,
			project_id: req.body.project_id,
		});
	} else {
		try {
			saved = await Saved.findOneAndUpdate(
				{ user_id: req.body.user_id },
				{ $push: { project_id: req.body.project_id } }
			);
		} catch (err) {
			return res.status(500).json({ message: err });
		}
	}
	try {
		const newSaved = await saved.save();
		res.status(201).json({ message: "Project Added" });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

// Get saved by id
router.get("/:user_id", getSavedByUserId, (req, res, next) => {
	if (res.saved != null) res.json(res.saved);
	else res.json({ message: "Zero saved projects" });
});

module.exports = router;
