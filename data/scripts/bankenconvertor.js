const geoUtils = require('./geoUtils');
const convertor = require('./convertor');

const convert = () => {
    convertor('./data/raw/banken.json', './data/converted/benches.json', (record) => {
        if (record["aantal"] < 1) return null;
        result = {
            "type": "bench",
            "description": record["Locatie"] ? record["Locatie"] : record["element"],
            "amount" : record["aantal"],
            "position": record["json_geometry"]["type"] !== "MultiPoint" ? 
                geoUtils.positionArrayToObject(record["json_geometry"]["coordinates"]) : 
                geoUtils.multipointCenter(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Bench data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;