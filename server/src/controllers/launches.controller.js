const launchesModel = require("../models/launches.model");

//Here we are converting the MAP type to Array type using Array.from
//The launches.values() works as an iterator to loop over all data in the map

async function getAllLaunches(req, res) {
  return res.status(200).json(await launchesModel.getAllLaunches());
}

function addNewLaunches(req, res) {
  let launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      err: "Missing required data!",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date value",
    });
  }
  launchesModel.addNewLaunch(launch);
  return res.status(201).json(launch);
}

function deleteLaunch(req, res) {
  const launchId = +req.params.id;
  if (!launchesModel.existsLaunchWithId(launchId)) {
    return res.status(400).json({
      error: "Data does not exist",
    });
  }
  const aborted = launchesModel.abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  deleteLaunch,
};
