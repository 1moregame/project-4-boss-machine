const express = require("express");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param("ideaId", (req, res, next, id) => {
  let idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    return next(new Error("No idea found"));
  }
});
ideasRouter.get("/", (req, res, next) => {
  let ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});

ideasRouter.post("/", (req, res, next) => {
  addToDatabase("ideas", req.body);
  res.send(req.body);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  let updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.status(204).send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  let success = deleteFromDatabasebyId(req.idea.id);
  if (success) res.status(204).send();
});

module.exports = ideasRouter;
