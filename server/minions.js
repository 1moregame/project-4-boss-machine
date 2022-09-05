const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const workRouter = require("./work");

minionsRouter.use("/:minionId/work", workRouter);

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);

  if (minion) {
    req.minion = minion;
    next();
  } else {
    return res.status(404).send(new Error("Minion not found"));
  }
});

const validMinion = (req, res, next) => {
  let { name, title, salary } = req.body;
  if (
    typeof name === "string" &&
    typeof title === "string" &&
    typeof Number(salary) !== NaN
  ) {
    next();
  } else {
    res.status(400).send();
  }
};
minionsRouter.get("/", (req, res, next) => {
  let minions = getAllFromDatabase("minions");
  res.send(minions);
});

minionsRouter.post("/", validMinion, (req, res, next) => {
  let minion = addToDatabase("minions", req.body);
  res.status(201).send(minion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put("/:minionId", validMinion, (req, res, next) => {
  let updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  let success = deleteFromDatabasebyId("minions", req.minion.id);
  if (success) res.status(204).send();
});

module.exports = minionsRouter;
