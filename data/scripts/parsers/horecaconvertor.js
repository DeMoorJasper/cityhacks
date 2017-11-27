const geoUtils = require('../utils/geoUtils');
const convertor = require('../utils/convertor');

function extractBranche(branche) {
    let res = branche.match(/([A-zé])\w+/);
    // Regex fail quickfix
    return res ? res[0] == "Caf" ? "Café" : res[0] : "";
}

const convert = () => {
    convertor('./data/raw/horeca.json', './data/converted/horeca.json', (record) => {
        result = {
            "type": "horeca",
            "sub-type": extractBranche(record["Branche"]),
            "description": record["Naam"],
            "position": geoUtils.positionArrayToObject(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Horeca data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;