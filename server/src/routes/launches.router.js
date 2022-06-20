const express = require("express");
const launchesController = require("../controllers/launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", launchesController.getAllLaunches);
launchesRouter.post("/", launchesController.addNewLaunches);

module.exports = launchesRouter;
