const horeca = require('../raw/horeca.json');

const utils = require('./utils');
const fs = require('fs');

function extractBranche(branche) {
    let res = branche.match(/([A-zé])\w+/);
    // Regex fail quickfix
    return res ? res[0] == "Caf" ? "Café" : res[0] : "";
}

const convert = () => {
    let converted = [];
    horeca.forEach(business => {
        let newBusiness = {
            "type": "horeca",
            "sub-type": extractBranche(business["Branche"]),
            "description": business["Naam"],
            "position": utils.positionArrayToObject(business["json_geometry"]["coordinates"])
        };
        converted.push(newBusiness);
    });
    fs.writeFile('./data/converted/horeca.json', JSON.stringify(converted, null, '\t'), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Horeca data written.");
    });
}

module.exports = convert;