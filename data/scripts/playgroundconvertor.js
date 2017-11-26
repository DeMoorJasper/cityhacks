const rawData = require('../raw/speelruimte.json');

const utils = require('./utils');
const fs = require('fs');

const convert = () => {
    let converted = [];
    rawData.forEach(data => {
        if (data["PUBLIEK"] === "J") {
            let newData = {
                "type": "kids",
                "sub-type": "forest",
                "description": `${data["json_featuretype"]} ${data["ID"]}`,
                "position": utils.positionArrayToObject(data["json_geometry"]["coordinates"])
            };
            converted.push(newData);
        }
    });
    fs.writeFile('./data/converted/playgrounds.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Playgrounds data written.");
    });
}

module.exports = convert;