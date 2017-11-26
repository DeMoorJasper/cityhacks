const locations = require('./locations');
const benches = require('./benches');
const horeca = require('./horeca');
const nature = require('./nature');
const culture = require('./culture');
const kids = require('./kids');

let persistence = {};

persistence.checkAll = function() {
    return new Promise((resolve, reject) => {
        locations.initTable().then(data => {
            console.log("[DB]: Table initialised");
            // Check / init all cleaned data
            benches.insertAll(() => {
                horeca.insertAll(() => {
                    nature.insertAll(() => {
                        culture.insertAll(() => {
                            kids.insertAll(() => {
                                resolve();
                            });
                        });
                    });
                });
            });
        }).catch(e => reject(e));
    });
};

module.exports = persistence;