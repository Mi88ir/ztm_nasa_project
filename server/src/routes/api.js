//api versioning
const api = require("express").Router();
const planetsRouter = require("./planets.router");
const launchesRouter = require("./launches.router");

api.use(planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
