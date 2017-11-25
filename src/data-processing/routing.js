const request = require('../utils/request');
const config = require('../../bin/config');
const locations = require('../database/locations');

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

routing.generateRoute = function(options) {
    return new Promise((resolve, reject) => {
        if (options && options.start && options.type && options.distance) {
            let routeBuilder = {
                distance: 0,
                lastPoint: options.start,
                points: [],
                addPoint: () => {
                    console.log("Add point");
                    locations.searchRadius(routeBuilder.lastPoint, 150, options.type)
                    .then((data) => {
                        if (data.length > 0) {
                            routeBuilder.points.push({
                                longitude: data[0].longitude,
                                latitude: data[0].latitude
                            });
                            routeBuilder.lastPoint.longitude = data[0].longitude;
                            routeBuilder.lastPoint.latitude = data[0].latitude;
                            routeBuilder.distance += 150;
                        } else {
                            routeBuilder.lastPoint.latitude += 150;
                            routeBuilder.lastPoint.longitude += 150;
                            routeBuilder.distance += 150;
                        }
                        if (routeBuilder.distance < options.distance) {
                            routeBuilder.addPoint();
                        } else {
                            return resolve(routeBuilder.points);
                        }
                    }).catch(e => console.log(e));
                }
            }
            routeBuilder.addPoint();
        } else {
            reject("invalid options");
        }
    });
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