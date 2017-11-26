const locations = require("./locations");

let culture = {};

culture.insertAll = function(callback) {
    const libraries = require('../../data/converted/libraries.json');
    const museums = require('../../data/converted/museums.json');
    
    libraries.forEach(library => {
        locations.insert(library);
    });
    console.log("[DB]: All libraries added.");
    museums.forEach(museum => {
        locations.insert(museum);
    });
    console.log("[DB]: All museums added.");
    callback();
}

module.exports = culture;