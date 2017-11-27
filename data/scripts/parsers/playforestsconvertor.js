const geoUtils = require('../utils/geoUtils');
const convertor = require('../utils/convertor');

const convert = () => {
    convertor('./data/raw/speelbossen.json', './data/converted/playforests.json', (record) => {
        result = {
            "type": "kids",
            "sub-type": "forest",
            "description": `${record["GROENOBJECT"]} ${record["STRAAT"]}`,
            "position": geoUtils.polygonCenter(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Play forest data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;