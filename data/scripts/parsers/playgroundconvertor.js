const geoUtils = require('../utils/geoUtils');
const convertor = require('../utils/convertor');

const convert = () => {
    convertor('./data/raw/speelruimte.json', './data/converted/playgrounds.json', (record) => {
        if (!(record["PUBLIEK"] === "J")) {
            return undefined;
        }
        result = {
            "type": "kids",
            "sub-type": "playground",
            "description": `${record["json_featuretype"]} ${record["ID"]}`,
            "position": geoUtils.positionArrayToObject(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Playgrounds data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;