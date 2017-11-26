const rawData = require('../raw/bibliotheken.json');

const utils = require('./utils');
const fs = require('fs');

const convert = () => {
    let converted = [];
    rawData.forEach(data => {
        let newData = {
            "type": "culture",
            "sub-type": "library",
            "description": data["NaamBibliotheek"],
            "position": utils.positionArrayToObject(data["json_geometry"]["coordinates"])
        };
        converted.push(newData);
    });
    fs.writeFile('./data/converted/libraries.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Library data written.");
    });
}

module.exports = convert;