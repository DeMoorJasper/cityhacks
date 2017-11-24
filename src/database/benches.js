const locations = require("./locations");

let benches = {};

benches.insertAllBenches = function() {
    const benches = require('../../data/converted/benches.json');

    benches.forEach(bench => {
        locations.insert(bench);
    });

    console.log("Bench data added.");
}

module.exports = benches;