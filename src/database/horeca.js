const locations = require("./locations");

let horeca = {};

horeca.insertAllHoreca = function(callback) {
    const horeca = require('../../data/converted/horeca.json');

    horeca.forEach(business => {
        locations.insert(business);
    });
    console.log("[DB]: All horeca businesses added.");
    callback();
}

module.exports = horeca;