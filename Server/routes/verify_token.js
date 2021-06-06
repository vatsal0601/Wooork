const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	const token = req.header("access_token");
	if (!token) return res.status(400).json({ message: "Access denied" });

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({ message: "Invalid token" });
	}
};
