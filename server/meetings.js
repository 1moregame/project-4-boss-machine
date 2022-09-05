const express = require("express");
const meetingsRouter = express.Router();
const { getAllFromDatabase } = require("./db");

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get("/", (req, res, next) => {
  let meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});
// POST /api/minions to create a new minion and save it to the database.
// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
// DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = meetingsRouter;
