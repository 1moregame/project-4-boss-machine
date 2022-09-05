const express = require("express");
const meetingsRouter = express.Router();
const { getAllFromDatabase } = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  let meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database.
// DELETE /api/meetings to delete all meetings from the database.POST /api/minions to create a new minion and save it to the database.

module.exports = meetingsRouter;
