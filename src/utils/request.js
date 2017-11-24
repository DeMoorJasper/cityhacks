const curl = require('curl');

const request = {};

request.get = function(url) {
    let options = {};
    return new Promise((resolve, reject) => {
        curl.get(url, options, function(err, response, body) {
            if (err) {
                return reject(err);
            }
            resolve(body);
        });
    });
};

module.exports = request;