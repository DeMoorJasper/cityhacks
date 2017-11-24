const locations = require("./locations");

let horeca = {};

horeca.insertAllHoreca = function() {
    const horeca = require('../../data/converted/horeca.json');

    horeca.forEach(business => {
        locations.insert(business);
    });

    console.log("All horeca businesses added.");
}

module.exports = horeca;