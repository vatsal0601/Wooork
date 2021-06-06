const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAccessToken = async (code, client_id, client_secret) => {
	const res = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ client_id, client_secret, code }),
	});
	const data = await res.text();
	const params = new URLSearchParams(data);
	return params.get("access_token");
};

const getGitHubUser = async (access_token) => {
	const request = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `token ${access_token}`,
		},
	});
	return await request.json();
};

const authenticateToken = (req, res, next) => {
	const access_token = req.headers["access_token"];
	if (access_token == null) return res.status(401).json({ message: "Unauthorized access" });
};

router.get("/login/github", (req, res, next) => {
	redirect_uri = "http://localhost:5000/auth/login/github/callback";
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}`
	);
});

router.get("/login/github/callback", async (req, res, next) => {
	const access_token = await getAccessToken(
		req.query.code,
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET
	);
	const githubData = await getGitHubUser(access_token);
	const token = jwt.sign({ access_token }, process.env.TOKEN_SECRET);
	res.header("access_token", token).json({ githubData });
});

router.get("/", (req, res, next) => {
	res.send("Authentication");
});

module.exports = router;
