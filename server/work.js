const express = require("express");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const workRouter = express.Router({ mergeParams: true });

workRouter.param("workId", (req, res, next, id) => {
  const workTask = getFromDatabaseById("work", id);
  if (workTask) {
    req.work = workTask;
    next();
  } else {
    return res.status(400).send(new Error("No task found"));
  }
});

workRouter.get("/", (req, res, next) => {
  const work = getAllFromDatabase("work");
  const minionsWork = work.filter((task) => task.minionId === req.minion.id);
  if (minionsWork) {
    res.status(200).send(minionsWork);
    next();
  } else {
    res.status(400).send();
    next();
  }
});

workRouter.post("/", (req, res, next) => {
  const newWork = addToDatabase("work", req.body);
  newWork.minionId = req.minion.id;
  res.status(201).send(newWork);
});

workRouter.put("/:workId", (req, res, next) => {
  if (req.minion.id !== req.work.minionId) {
    return res
      .status(400)
      .send(new Error("Cannot modify task form other minion"));
  }
  const revisedWork = updateInstanceInDatabase("work", req.body);
  res.status(201).send(revisedWork);
});

workRouter.delete("/:workId", (req, res, next) => {
  const success = deleteFromDatabasebyId("work", req.work.id);
  if (success) res.status(204);
  else res.status(500);
  res.send(new Error("failed to delete work task"));
});

module.exports = workRouter;
