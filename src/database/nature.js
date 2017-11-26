const locations = require("./locations");

let nature = {};

nature.insertAll = function(callback) {
    const natureData = require('../../data/converted/nature.json');

    natureData.forEach(natureLocation => {
        locations.insert(natureLocation);
    });
    console.log("[DB]: Nature data added.");
    callback();
}

module.exports = nature;