const rawData = require('../raw/buurtgroen.json');
const rawDatas = require('../raw/groeninventarisok.json');

const utils = require('./utils');
const fs = require('fs');

const convert = () => {
    let converted = [];
    rawData.forEach(data => {
        let newData = {
            "type": "nature",
            "sub-type": data["groenobject"],
            "description": `${data["groenobject"]} ${data["straat"]}`,
            "position": data["json_geometry"]["type"] === "Polygon" ? utils.polygonCenter(data["json_geometry"]["coordinates"]) : utils.multiPolygonCenter(data["json_geometry"]["coordinates"])
        };
        converted.push(newData);
    });
    rawDatas.forEach(data => {
        if (!data["json_geometry"]) {
            return true;
        }
        let newData = {
            "type": "nature",
            "sub-type": data["GROENOBJECT"],
            "description": `${data["GROENOBJECT"]} ${data["STRAAT"]}`,
            "position": data["json_geometry"]["type"] === "Polygon" ? utils.polygonCenter(data["json_geometry"]["coordinates"]) : utils.multiPolygonCenter(data["json_geometry"]["coordinates"])
        };
        converted.push(newData);
    });
    fs.writeFile('./data/converted/nature.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Nature data written.");
    });
}

module.exports = convert;