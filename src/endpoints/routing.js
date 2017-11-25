const calculateRoute = require("../data-processing/routing");

const routing = {};

routing.handleRequest = function(req, res) {
    let options = req.query.options;
    console.log(options);
    options = options ? JSON.parse(options) : undefined;

    if (options && options.start && options.type && options.distance) {
        calculateRoute.generateRoute(options).then((data) => {
            if (data.length === 0) {
                return res.json({
                    "error": "No route found"
                });
            }
            calculateRoute.calculate(data).then((route) => {
                res.json(route);
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