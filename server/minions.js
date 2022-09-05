const express = require("express");
const minionsRouter = express.Router();
const { getAllFromDatabase } = require("./db");

// GET /api/minions to get an array of all minions.
minionsRouter.get("/", (req, res, next) => {
  let minions = getAllFromDatabase("minions");
  res.send(minions);
});
// POST /api/minions to create a new minion and save it to the database.
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = minionsRouter;
