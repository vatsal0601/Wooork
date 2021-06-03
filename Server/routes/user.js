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
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
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
	if (req.body.name != null) res.user.name = req.body.name;
	if (req.body.username != null) res.user.username = req.body.username;
	if (req.body.email != null) res.user.email = req.body.email;
	if (req.body.password != null) res.user.password = req.body.password;
	if (req.body.phone != null) res.user.phone = req.body.phone;
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
