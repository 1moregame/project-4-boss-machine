const express = require("express");
const meetingsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  let meetings = getAllFromDatabase("meetings");
  res.send(meetings);
  next();
});

meetingsRouter.post("/", (req, res, next) => {
  const meeting = createMeeting();
  res.status(201).send(addToDatabase("meetings", meeting));
});

meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
