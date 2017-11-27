const geoUtils = require('../utils/geoUtils');
const convertor = require('../utils/convertor');

const convert = () => {
    convertor('./data/raw/musea.json', './data/converted/museums.json', (record) => {
        result = {
            "type": "culture",
            "sub-type": "museum",
            "description": record["Gebouw"],
            "position": geoUtils.polygonCenter(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Museum data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;