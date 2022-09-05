const express = require("express");
const minionsRouter = express.Router();
const { getAllFromDatabase } = require("./db");

minionsRouter.get("/", (req, res, next) => {
  let minions = getAllFromDatabase("minions");
  res.send(minions);
});
// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post("/", (req, res, next) => {
  let minion = req.body;
  if (minion.name && minion.title && minion.weaknesses && minion.salary) {
    console.log(minion);
  }
});
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = minionsRouter;
