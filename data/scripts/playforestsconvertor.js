const rawData = require('../raw/speelbossen.json');

const utils = require('./utils');
const fs = require('fs');

const convert = () => {
    let converted = [];
    rawData.forEach(data => {
        let newData = {
            "type": "kids",
            "sub-type": "forest",
            "description": `${data["GROENOBJECT"]} ${data["STRAAT"]}`,
            "position": utils.polygonCenter(data["json_geometry"]["coordinates"])
        };
        converted.push(newData);
    });
    fs.writeFile('./data/converted/playforests.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Play forests data written.");
    });
}

module.exports = convert;