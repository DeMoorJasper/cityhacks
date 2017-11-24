const banken = require('../raw/banken.json');

const utils = require('./utils');
const fs = require('fs');

const convert = () => {
    let converted = [];
    banken.forEach(bank => {
        if (!(bank["aantal"] && bank["aantal"] > 0)) {
            return true;
        }
        let newBank = {
            "type": "bench",
            "description": bank["Locatie"] ? bank["Locatie"] : bank["element"],
            "amount" : bank["aantal"],
            "position": bank["json_geometry"]["type"] !== "MultiPoint" ? 
                utils.positionArrayToObject(bank["json_geometry"]["coordinates"]) : 
                utils.multipointCenter(bank["json_geometry"]["coordinates"])
        };
        converted.push(newBank);
    });
    fs.writeFile('./data/converted/benches.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Data written.");
    });
}

module.exports = convert;