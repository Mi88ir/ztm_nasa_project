const fs = require("fs");
const path = require('path');
const { parse } = require("csv-parse");
const results = [];

//We use the createReadStream to stream data from the csv file
//and then we pipe the data and use the parse function to 
//make the data readable for our usage
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'data.csv'))
            .pipe(parse({
                comment: '#', // defining the comment character to ignore those lines
                columns: true //ensure our data comes as a JSON object
            }))
            .on("data", (data) => {
                //We read the data here and store it in the results array
                if (data.koi_disposition == 'CONFIRMED' && data.koi_insol > 0.36 && data.koi_insol < 1.11 && data.koi_prad < 1.6)
                    results.push(data.kepler_name);
            })
            .on("error", (err) => {
                //Error logging
                console.log(err);
                reject(err);
            })
            .on("end", () => {
                //Logging the resultant array - results
                console.log(`Total number of planets in results: ${results.length}`)
                resolve();
            })
    });
}


module.exports = {
    loadPlanetsData,
    planets: results
};