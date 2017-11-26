const rawData = require('../raw/musea.json');

const utils = require('./utils');
const fs = require('fs');

const convert = () => {
    let converted = [];
    rawData.forEach(data => {
        let newData = {
            "type": "culture",
            "sub-type": "museum",
            "description": data["Gebouw"],
            "position": utils.polygonCenter(data["json_geometry"]["coordinates"])
        };
        converted.push(newData);
    });
    fs.writeFile('./data/converted/museums.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Museum data written.");
    });
}

module.exports = convert;