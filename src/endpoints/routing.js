const calculateRoute = require("../data-processing/routing");

const routing = {};

function appendDetailsToWaypoints(route, detailed) {
    if (detailed.length < route.waypoints.length) return route;
    for (let i=0; i < route.waypoints.length; i++) {
        route.waypoints[i].type = detailed[i].type;
        route.waypoints[i].subType = detailed[i].subType;
        route.waypoints[i].description = detailed[i].description;
        route.waypoints[i].amount = detailed[i].amount;
        route.waypoints[i].img = detailed[i].img;
    }
    return route;
}

routing.handleRequest = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let options = req.query.options;
    options = options ? JSON.parse(options) : undefined;

    if (options && options.start && options.type && options.distance) {
        calculateRoute.generateRoute(options).then((data) => {
            if (data.length < 2) {
                return res.json({
                    "error": "No route found"
                });
            }
            console.log(data);
            data = (data.length && data.length > 25) ? data.splice(0, data.length - 25) : data;
            calculateRoute.calculate(data).then((route) => {
                if (route) {
                    if (route.message) {
                        console.log(route.message);
                        return res.json({
                            "error": "Error accured while generating the route."
                        });
                    }
                    
                    return res.json(appendDetailsToWaypoints(route, data));
                }
            }).catch(e => {
                res.json({
                    "error": "An error accured."
                });
            });
        }).catch(e => console.log(e));
        return;
    }
    return res.json({
        "error": "Invalid options in request."
    });
}

module.exports = routing;