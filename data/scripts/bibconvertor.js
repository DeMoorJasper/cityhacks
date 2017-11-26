const geoUtils = require('./geoUtils');
const convertor = require('./convertor');

const convert = () => {
    convertor('./data/raw/bibliotheken.json', './data/converted/libraries.json', (record) => {
        result = {
            "type": "culture",
            "sub-type": "library",
            "description": record["NaamBibliotheek"],
            "position": geoUtils.positionArrayToObject(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Library data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;