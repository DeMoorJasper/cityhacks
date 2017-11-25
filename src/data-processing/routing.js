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
                radius: 150,
                passed: {},
                addPoint: () => {
                    locations.searchRadius(routeBuilder.lastPoint, routeBuilder.radius, options.type)
                    .then((data) => {
                        if (data.length > 0) {
                            let key = `${data[0].longitude}-${data[0].latitude}`;
                            if (!routeBuilder.passed[key]) {
                                routeBuilder.passed[key] = true;
                                routeBuilder.points.push({
                                    longitude: data[0].longitude,
                                    latitude: data[0].latitude
                                });
                                routeBuilder.lastPoint.longitude = data[0].longitude;
                                routeBuilder.lastPoint.latitude = data[0].latitude;
                                // TODO improve distance adder
                                routeBuilder.distance += routeBuilder.radius;
                            }
                        } else {
                            if (routeBuilder.radius > options.distance) {
                                return resolve(routeBuilder.points);
                            }
                            routeBuilder.radius = routeBuilder.radius * 2;
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
            // console.log(waypoints);
            let path = `https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints}?access_token=${config.getMapBoxKey()}&steps=true&geometries=geojson&language=nl`;
            request.get(path).then((data) => {
                    resolve(JSON.parse(data));
                }).catch(e => {
                    reject(e);
                });
        }
    });
}

module.exports = routing;