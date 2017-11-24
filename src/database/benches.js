const locations = require("./locations");

let benches = {};

benches.insertAllBenches = function(callback) {
    const benches = require('../../data/converted/benches.json');

    benches.forEach(bench => {
        locations.insert(bench);
    });
    console.log("[DB]: Bench data added.");
    callback();
}

module.exports = benches;