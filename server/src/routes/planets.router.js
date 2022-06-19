const express = require('express');
const planetsController = require('../controllers/planets.controller');

//Alternatively you can import the controller like below
//const  { getAllPlanets} = require('../controllers/planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', planetsController.getAllPlanets);

module.exports = planetsRouter;