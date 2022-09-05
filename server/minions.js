const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);

  if (minion) {
    req.minion = minion;
    req.minionId = id;
    next();
  } else {
    return next(new Error("Minion not found"));
  }
});

minionsRouter.get("/", (req, res, next) => {
  let minions = getAllFromDatabase("minions");
  res.send(minions);
});

minionsRouter.post("/", (req, res, next) => {
  let minion = req.body;
  if (minion.name && minion.title && minion.weaknesses && minion.salary) {
    minion = addToDatabase("minions", minion);
  }
  res.status(201).send(minion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  let updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  let success = deleteFromDatabasebyId("minions", req.minionId);
  if (success) res.status(204).send();
});

module.exports = minionsRouter;
