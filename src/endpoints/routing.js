const calculateRoute = require("../data-processing/routing");

const routing = {};

routing.handleRequest = function(req, res) {
    let options = req.query.options;
    options = options ? JSON.parse(options) : undefined;

    if (options && options.waypoints) {
        calculateRoute.calculate(options.waypoints).then((route) => {
            res.json(route);
        }).catch(e => {
            res.json(e);
        });
        return;
    }
    return res.json({
        "error": "Invalid options in request."
    });
}

module.exports = routing;