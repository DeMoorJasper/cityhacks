const request = require('request');
const fs = require('fs');
const apiKey = require('../../../bin/config').getGoogleMapsApi();

const DIRECTORY = './data/image-dump/';

function fetchGoogleImage(position) {
    const checkUri = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${position.latitude},${position.longitude}&key=${apiKey}`;
    const uri = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${position.latitude},${position.longitude}&heading=180&key=${apiKey}`;
    const fileLocation = `${DIRECTORY}${position.latitude}-${position.longitude}.jpeg`;
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(DIRECTORY)) {
            fs.mkdirSync(DIRECTORY);
        }

        fs.stat(fileLocation, (existError, stats) => {
            // Only request if the file is not already in here...
            request(checkUri, { encoding: "UTF8" }, (error, response, body) => {
                if (error) return reject(error);
                if (!body) return reject(undefined);
                body = JSON.parse(body);
                if (body.status === "ZERO_RESULTS" || body.status === "NOT_FOUND") {
                    return resolve();
                } else {
                    if (existError) {
                        request(uri, { encoding: 'binary' }, (error, response, body) => {
                            if (error) return reject(error);
                            fs.writeFile(fileLocation, body, 'binary', function (err) {
                                if (err) return reject(err);
                                console.log(uri + " fetched");
                                return resolve();
                            });
                        });
                    }
                }
            });
            return resolve();
        });
    });
}

module.exports = fetchGoogleImage;