const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.on("error", (err) => console.error(err));
database.once("open", () => console.log("Database Connected"));

app.use(express.json());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const projectRouter = require("./routes/project");
app.use("/project", projectRouter);

const notificationRouter = require("./routes/notification");
app.use("/notification", notificationRouter);

app.listen(5000);
