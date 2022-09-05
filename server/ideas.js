const express = require("express");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const validIdea = (req, res, next) => {
  const { name, description, numWeeks, weeklyRevenue } = req.body;
  console.log(req.body);
  if (
    typeof name === "string" &&
    typeof description === "string" &&
    typeof Number(numWeeks) !== NaN &&
    typeof Number(weeklyRevenue) !== NaN
  ) {
    next();
  } else {
    res.status(409).send();
  }
};

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    return res.status(404).send(new Error("No Idea Found"));
  }
});

ideasRouter.get("/", (req, res, next) => {
  let ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});

ideasRouter.post("/", checkMillionDollarIdea, validIdea, (req, res, next) => {
  let idea = addToDatabase("ideas", req.body);
  res.status(201).send(idea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put(
  "/:ideaId",
  checkMillionDollarIdea,
  validIdea,
  (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase("ideas", req.body);
    res.status(204).send(updatedIdea);
  }
);

ideasRouter.delete("/:ideaId", (req, res, next) => {
  let success = deleteFromDatabasebyId(req.idea.id);
  if (success) res.status(204).send();
});

module.exports = ideasRouter;
