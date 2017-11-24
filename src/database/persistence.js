const locations = require('./locations');
const benches = require('./benches');
const horeca = require('./horeca');

let persistence = {};

persistence.checkAll = function() {
    locations.initTable().then(data => {
        console.log("Table initialised");
        // Check / init all cleaned data
        benches.insertAllBenches();
        horeca.insertAllHoreca();
    }).catch(e => console.log(e));
};

module.exports = persistence;