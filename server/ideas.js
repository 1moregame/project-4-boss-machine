const express = require("express");
const ideasRouter = express.Router();
const { getAllFromDatabase } = require("./db");

// GET /api/ideas to get an array of all ideas.
ideasRouter.get("/", (req, res, next) => {
  let ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});
// POST /api/minions to create a new minion and save it to the database.
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = ideasRouter;
