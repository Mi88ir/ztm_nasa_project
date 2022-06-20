const api_url = "http://localhost:8000/";
// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${api_url}planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${api_url}launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${api_url}launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
