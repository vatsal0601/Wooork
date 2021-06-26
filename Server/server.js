const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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
database.once("open", () => console.log("Database Connected"));

app.use(express.json());

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

app.listen(5000);
