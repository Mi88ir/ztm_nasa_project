const {launches} = require('../models/launches.model');

//Here we are converting the MAP type to Array type using Array.from 
//The launches.values() works as an iterator to loop over all data in the map

function getAllLaunches(req, res) {
    return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
    getAllLaunches
}