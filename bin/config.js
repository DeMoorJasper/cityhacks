const config = require("../config.json");

const configExports = {};

configExports.getServerPort = function() {
    return config.port;
};

module.exports = configExports;