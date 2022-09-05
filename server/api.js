const express = require("express");
const app = require("../server");
const apiRouter = express.Router();

const morgan = require("morgan");
app.use(morgan("dev"));

const minionsRouter = require("./minions");
app.use("/api/minions", minionsRouter);

const ideasRouter = require("./ideas");
app.use("/api/ideas", ideasRouter);

const meetingsRouter = require("./meetings");
app.use("/api/meetings", meetingsRouter);

module.exports = apiRouter;
