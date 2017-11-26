const locations = require("./locations");

let kids = {};

kids.insertAll = function(callback) {
    const playgrounds = require('../../data/converted/playgrounds.json');
    const playforests = require('../../data/converted/playforests.json');
    
    playgrounds.forEach(playground => {
        locations.insert(playground);
    });
    console.log("[DB]: All playgrounds added.");
    playforests.forEach(playforest => {
        locations.insert(playforest);
    });
    console.log("[DB]: All playforests added.");
    callback();
}

module.exports = kids;