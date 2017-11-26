const geoUtils = require('./geoUtils');
const convertor = require('./convertor');

const convert = () => {
    convertor('./data/raw/buurtgroen.json', './data/converted/neighboorhood-nature.json', (record) => {
        result = {
            "type": "nature",
            "sub-type": record["groenobject"],
            "description": `${record["groenobject"]} ${record["straat"]}`,
            "position": record["json_geometry"]["type"] === "Polygon" ? 
                    geoUtils.polygonCenter(record["json_geometry"]["coordinates"]) : 
                    geoUtils.multiPolygonCenter(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Neighboorhood nature data written.");
    }).catch(e => {
        console.log(e);
    });
    convertor('./data/raw/groeninventarisok.json', './data/converted/nature-inventory.json', (record) => {
        if (!record["json_geometry"]) return null;
        result = {
            "type": "nature",
            "sub-type": record["GROENOBJECT"],
            "description": `${record["GROENOBJECT"]} ${record["STRAAT"]}`,
            "position": record["json_geometry"]["type"] === "Polygon" ? 
                    geoUtils.polygonCenter(record["json_geometry"]["coordinates"]) : 
                    geoUtils.multiPolygonCenter(record["json_geometry"]["coordinates"])
        };
        return result;
    }).then(() => {
        console.log("Nature inventory data written.");
    }).catch(e => {
        console.log(e);
    });
}

module.exports = convert;