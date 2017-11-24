const request = require('../utils/request');
const config = require('../../bin/config');

const routing = {};

function waypointToString(waypoints) {
    if (waypoints.length > 0) {
        let res = "";
        waypoints.forEach(waypoint => {
            res += `${waypoint.longitude},${waypoint.latitude};`
        });
        return res.substring(0, res.length - 1).trim();
    }
    return "";
}

routing.calculate = function(waypoints) {
    return new Promise((resolve, reject) => {
        // type= mapbox/walking
        // distance = meters
        waypoints = waypointToString(waypoints);
        if (waypoints) {
            console.log(waypoints);
            let path = `https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints}?access_token=${config.getMapBoxKey()}&steps=true&geometries=geojson`;
            request.get(path).then((data) => {
                    resolve(JSON.parse(data));
                }).catch(e => {
                    reject(e);
                });
        }
    });
}

module.exports = routing;