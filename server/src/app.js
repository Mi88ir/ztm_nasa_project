const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets.router");
const launchesRouter = require("./routes/launches.router");
const app = express();

//Managing CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Implementing Morgan for logging files
app.use(morgan("combined"));

//JSON format
app.use(express.json());

//Define path & router usage
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.use('/launches',launchesRouter);

//enabling the build to run on same port as server
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
