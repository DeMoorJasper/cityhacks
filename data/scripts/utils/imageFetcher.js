const request = require('request');
const fs = require('fs');
const apiKey = require('../../../bin/config').getGoogleMapsApi();

const DIRECTORY = './data/image-dump/';
const DELAY_TIME = 60000;

let delayed = [];
let timeout = null;

function removeDelayed(position) {
    let index = delayed.indexOf(position);
    if (index >= 0) {
        delayed.splice(index, 1);
    }
}

function addDelayed(position) {
    let index = delayed.indexOf(position);
    if (index >= 0) {
        delayed.push(position);
    }
}

function runDelayed() {
    console.log("Run delayed image-dump");
    console.log("# of delayed requests: " + delayed.length);
    delayed.forEach(fetchGoogleImage);
}

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
            if (!existError) return resolve();
            request(checkUri, { encoding: "UTF8" }, (error, response, body) => {
                if (error || !body) {
                    addDelayed(position);
                    // delay request for a minute
                    clearTimeout(timeout);
                    timeout = setTimeout(runDelayed, DELAY_TIME);
                    // Reject the promise anyways... might fix this later
                    return reject(error);
                }
                body = JSON.parse(body);
                if (body.status === "ZERO_RESULTS" || body.status === "NOT_FOUND") {
                    removeDelayed(position);
                    return resolve();
                } else {
                    request(uri, { encoding: 'binary' }, (error, response, body) => {
                        if (error) return reject(error);
                        fs.writeFile(fileLocation, body, 'binary', function (err) {
                            if (err) return reject(err);
                            console.log(uri + " fetched");
                            removeDelayed(position);
                            return resolve();
                        });
                    });
                }
            });
            return resolve();
        });
    });
}

module.exports = fetchGoogleImage;