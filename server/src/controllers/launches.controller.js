const launchesModel = require("../models/launches.model");

//Here we are converting the MAP type to Array type using Array.from
//The launches.values() works as an iterator to loop over all data in the map

async function getAllLaunches(req, res) {
  return res.status(200).json(await launchesModel.getAllLaunches());
}

async function addNewLaunches(req, res) {
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
  await launchesModel.scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function deleteLaunch(req, res) {
  const launchId = +req.params.id;
  console.log(`Launch id is ${launchId}`);
  const existsLaunch = await launchesModel.existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(400).json({
      error: "Data does not exist",
    });
  }
  const aborted = await launchesModel.abortLaunchById(launchId);
  console.log(`Aborted value is ${aborted}`);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  deleteLaunch,
};
