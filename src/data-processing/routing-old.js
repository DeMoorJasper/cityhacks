/*process.env.UV_THREADPOOL_SIZE = Math.ceil(require('os').cpus().length * 1.5);

const OSRM = require('osrm');
const path = require('path');

const osrm = new OSRM(path.join(__dirname, "../../data/routing/brugge.osrm"));

const routing = {};

routing.calculate = function(start, end, alternatives) {
    return new Promise((resolve, reject) => {
        let coordinates = [];
        let start = start.split(',');
        coordinates.push([+start[0],+start[1]]);
        let end = end.split(',');
        coordinates.push([+end[0],+end[1]]);
        let query = {
            coordinates: coordinates,
            alternateRoute: alternatives !== false
        };
        osrm.route(query, function(err, result) {
            if (err) return reject({
                "error": err.message
            });
            resolve(result);
        });
    });
}

module.exports = routing;*/