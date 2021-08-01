const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
	})
);

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
const database = mongoose.connection;
database.on("error", (err) => console.error(err));
database.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage }).single("file");

app.post("/project/upload", upload, (req, res, next) => {
	res.json({ message: "Image uploaded successfully" });
});

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const projectRouter = require("./routes/project");
app.use("/project", projectRouter);

const notificationRouter = require("./routes/notification");
app.use("/notification", notificationRouter);

const savedRouter = require("./routes/saved");
app.use("/saved", savedRouter);

app.listen(process.env.PORT || 5000);
