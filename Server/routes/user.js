const express = require("express");
const router = express.Router();
const User = require("../models/user");

const getUserById = async (req, res, next) => {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) return res.status(404).json({ message: "Cannot find user" });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.user = user;
	next();
};

const getUserByUsername = async (req, res, next) => {
	let user;
	try {
		user = await User.findOne({ username: req.params.username });
		if (user == null) return res.status(404).json({ message: "Cannot find user" });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.user = user;
	next();
};

// Creating User
router.post("/", async (req, res, next) => {
	user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		avatar: req.body.avatar,
		phone: req.body.phone,
		social_links: req.body.social_links,
		education: req.body.education,
		experience: req.body.experience,
		skills: req.body.skills,
	});
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

// Get user by username
router.get("/username=:username", getUserByUsername, (req, res, next) => {
	res.json(res.user);
});

// Delete user by id
router.delete("/delete=:id", getUserById, async (req, res, next) => {
	try {
		await res.user.remove();
		res.json({ message: "User Deleted" });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Update user by id
router.patch("/update=:id", getUserById, async (req, res, next) => {
	if (req.body.social_links != null) res.user.social_links = req.body.social_links;
	if (req.body.education != null) res.user.education = req.body.education;
	if (req.body.experience != null) res.user.experience = req.body.experience;
	if (req.body.skills != null) res.user.skills = req.body.skills;

	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

// Get random users
router.get("/random", async (req, res, next) => {
	try {
		user = await User.aggregate([{ $sample: { size: 3 } }]);
		if (user == null) return res.status(404).json({ message: "Cannot get users" });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Get array of skill from all users
router.get("/skills", async (req, res, next) => {
	const skills = await User.find({}, { skills: 1, _id: 0 });
	if (skills == null) return res.status(404).json({ message: "No skills available" });
	let skillsArray = [];
	for (skill of skills) {
		for (element of skill.skills) skillsArray.push(element);
	}
	res.json([...new Set(skillsArray)]);
});

// Get search results from array
router.get("/search/:array", async (req, res, next) => {
	searchArray = req.params.array.split("&");
	try {
		const search = await User.find({ skills: { $in: searchArray } });
		res.json(search);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Get user by id
router.get("/:id", getUserById, (req, res, next) => {
	res.json(res.user);
});

// Get all users
router.get("/", async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
