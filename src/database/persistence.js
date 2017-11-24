const locations = require('./locations');
const benches = require('./benches');
const horeca = require('./horeca');
const nature = require('./nature');

let persistence = {};

persistence.checkAll = function() {
    return new Promise((resolve, reject) => {
        locations.initTable().then(data => {
            console.log("[DB]: Table initialised");
            // Check / init all cleaned data
            benches.insertAllBenches(() => {
                horeca.insertAllHoreca(() => {
                    nature.insertAllNature(() => {
                        resolve();
                    });
                });
            });
        }).catch(e => reject(e));
    });
};

module.exports = persistence;