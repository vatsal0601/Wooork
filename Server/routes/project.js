const express = require("express");
const router = express.Router();
const Project = require("../models/project");

const getProjectById = async (req, res, next) => {
	let project;
	try {
		project = await Project.findById(req.params.id);
		if (project == null) return res.status(404).json({ message: "Cannot find project" });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.project = project;
	next();
};

const getProjectByName = async (req, res, next) => {
	let project;
	try {
		project = await Project.find({ project_name: req.params.project_name });
		if (project == null) return res.status(404).json({ message: "Cannot find project" });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.project = project;
	next();
};

const getProjectsByUserId = async (req, res, next) => {
	let project;
	try {
		project = await Project.find({ user_id: req.params.user_id });
		if (project == null) return res.status(404).json({ message: "Cannot find projects" });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
	res.project = project;
	next();
};

// Creating Project
router.post("/", async (req, res, next) => {
	const project = new Project({
		user_id: req.body.user_id,
		owner_name: req.body.owner_name,
		project_name: req.body.project_name,
		description: req.body.description,
		url: req.body.url,
		tag: req.body.tag,
		collaborators: req.body.collaborators,
		image: req.body.image,
		project_status: req.body.project_status,
	});
	try {
		const newProject = await project.save();
		res.status(201).json(newProject);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

// Get projects by user_id
router.get("/user_id=:user_id", getProjectsByUserId, (req, res, next) => {
	res.json(res.project);
});

// Get project by project_name
router.get("/project_name=:project_name", getProjectByName, (req, res, next) => {
	res.json(res.project);
});

// Delete project by id
router.delete("/delete=:id", getProjectById, async (req, res, next) => {
	try {
		await res.project.remove();
		res.json({ message: "User Deleted" });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Update project by id
router.patch("/update=:id", getProjectById, async (req, res, next) => {
	if (req.body.project_name != null) res.project.project_name = req.body.project_name;
	if (req.body.description != null) res.project.description = req.body.description;
	if (req.body.url != null) res.project.url = req.body.url;
	if (req.body.tag != null) res.project.tag = req.body.tag;
	if (req.body.collaborators != null) res.project.collaborators = req.body.collaborators;
	if (req.body.image != null) res.project.image = req.body.image;
	if (req.body.project_status != null) res.project.project_status = req.body.project_status;

	try {
		const updatedProject = await res.project.save();
		res.json(updatedProject);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.get("/random", async (req, res, next) => {
	try {
		project = await Project.aggregate([{ $sample: { size: 4 } }]);
		if (project == null) return res.status(404).json({ message: "Cannot get projects" });
		res.json(project);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Get array of tags from all projects
router.get("/tags", async (req, res, next) => {
	const tags = await Project.find({}, { tag: 1, _id: 0 });
	if (tags == null) return res.status(404).json({ message: "No tags available" });
	let tagArray = [];
	for (tag of tags) {
		for (element of tag.tag) tagArray.push(element);
	}
	res.json([...new Set(tagArray)]);
});

// Get search results from array
router.get("/search/:array", async (req, res, next) => {
	searchArray = req.params.array.split("&");
	try {
		const search = await Project.find({ tag: { $in: searchArray } });
		res.json(search);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Get project by id
router.get("/:id", getProjectById, (req, res, next) => {
	res.json(res.project);
});

// Get all projects
router.get("/", async (req, res, next) => {
	try {
		const projects = await Project.find();
		res.json(projects);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
