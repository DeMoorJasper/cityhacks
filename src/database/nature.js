const locations = require("./locations");

let nature = {};

nature.insertAll = function (callback) {
    const neighboorhoodNature = require('../../data/converted/neighboorhood-nature.json');
    neighboorhoodNature.forEach(record => {
        locations.insert(record);
    });

    const natureInventory = require('../../data/converted/nature-inventory.json');
    natureInventory.forEach(record => {
        locations.insert(record);
    });

    console.log("[DB]: Nature data added.");
    callback();
}

module.exports = nature;