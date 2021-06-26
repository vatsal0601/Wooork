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

const getGitHubEmail = async (access_token) => {
	const request = await fetch("https://api.github.com/user/emails", {
		headers: {
			Authorization: `token ${access_token}`,
		},
	});
	return await request.json();
};

router.get("/github", (req, res, next) => {
	redirect_uri = "http://localhost:5000/auth/github/callback";
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read:user%20user:email`
	);
});

router.get("/github/callback", async (req, res, next) => {
	const access_token = await getAccessToken(
		req.query.code,
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET
	);
	const githubData = await getGitHubUser(access_token);
	if (githubData.email === null) {
		const emailArray = await getGitHubEmail(access_token);
		emailArray.map((email) => {
			if (email.primary) githubData.email = email.email;
		});
	}
	/*const token = jwt.sign({ access_token }, process.env.TOKEN_SECRET);
	res.header("access_token", token).json({
		username: githubData.login,
		url: githubData.html_url,
		avatar: githubData.avatar_url,
		name: githubData.name,
		email: githubData.email,
	});*/
	res.redirect(
		`http://localhost:3000/github/${githubData.login}%20%20${githubData.html_url.replace(
			/\//g,
			"-"
		)}%20%20${githubData.avatar_url.replace(/\//g, "-").replace(/\?/g, "!")}%20%20${
			githubData.name
		}%20%20${githubData.email}`
	);
});

router.get("/", (req, res, next) => {
	res.send("Authentication");
});

module.exports = router;
