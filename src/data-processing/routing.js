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
        let i = 0;
        if (options && options.start && options.type && options.distance) {
            let routeBuilder = {
                distance: 0,
                lastPoint: options.start,
                points: [],
                radius: options.distance / 25,
                passed: {},
                addPoint: () => {
                    console.log("Search point " + i);
                    i++;
                    locations.searchRadius(routeBuilder.lastPoint, routeBuilder.radius, options.type)
                    .then((data) => {
                        if (data.length > 0) {
                            let point = {
                                longitude: data[0].longitude,
                                latitude: data[0].latitude
                            };
                            let key = `${point.longitude}-${point.latitude}`;
                            let index = 0;
                            while (routeBuilder.passed[key]) {
                                index++;
                                if (data.length < index) {
                                    point = {
                                        longitude: data[index].longitude,
                                        latitude: data[index].latitude
                                    };
                                    key = `${point.longitude}-${point.latitude}`;
                                } else {
                                    break;
                                }
                            }
                            if (!routeBuilder.passed[key]) {
                                routeBuilder.passed[key] = true;
                                routeBuilder.points.push(data[index]);
                                routeBuilder.lastPoint.longitude = point.longitude;
                                routeBuilder.lastPoint.latitude = point.latitude;
                                // Point found, reset radius
                                routeBuilder.radius = 50;
                                // TODO improve distance adder
                                routeBuilder.distance += routeBuilder.radius;
                            } else {
                                routeBuilder.radius = routeBuilder.radius * 2;
                            }
                        } else {
                            routeBuilder.radius = routeBuilder.radius * 2;
                        }
                        if ((routeBuilder.distance + routeBuilder.radius) < options.distance) {
                            return routeBuilder.addPoint();
                        }
                        console.log(routeBuilder.distance);
                        return resolve(routeBuilder.points);
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