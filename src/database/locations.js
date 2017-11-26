const db = require('sqlite');
const database = require('./database');
const geoUtils = require('../utils/geoUtils');

let locations = {};

locations.initTable = function() {
    return db.run("CREATE TABLE IF NOT EXISTS locations (type varchar(100), " +
        "subType varchar(100), description varchar(250), amount int(5), " +
        "longitude FLOAT(250), latitude FLOAT(250), PRIMARY KEY (longitude, latitude));");
};

locations.insert = function(location) {
    let type = location.type ? `${database.removeQuote(location.type)}` : "NULL";
    let subType = location['sub-type'] ? `${database.removeQuote(location['sub-type'])}` : "NULL";
    let description = location.description ? `${database.removeQuote(location.description)}` : "NULL";
    let amount = !isNaN(location.amount) ? `${parseInt(location.amount)}` : 0;
    let longitude = !isNaN(location.position.longitude) ? `${parseFloat(location.position.longitude)}` : 0;
    let latitude = !isNaN(location.position.latitude) ? `${parseFloat(location.position.latitude)}` : 0;
    let query = `INSERT OR IGNORE INTO locations (type, subType, description, amount, longitude, latitude) ` + 
    `VALUES('${type}', '${subType}', '${description}', '${amount}', '${longitude}', ${latitude});`;
    return db.run(query);
};

locations.search = function(query, page) {
    query = `%${query}%`;
    page = page ? page : 0;
    return db.all("SELECT * FROM locations WHERE description LIKE ? AND type IS NOT 'bench' LIMIT 25 OFFSET ?", query, page);
};

locations.searchRadius = function(position, radius, type) {
    console.log(position);
    if (!position || !radius || !type) return;
    if (isNaN(position.longitude) || isNaN(position.latitude)) return;
    let longitudeRadius = geoUtils.meterToLongitude(radius, position.longitude);
    let latitudeRadius = geoUtils.meterToLatitude(radius, position.latitude);
    let maxPosition = {
        longitude: position.longitude + longitudeRadius,
        latitude: position.latitude + latitudeRadius
    }
    let minPosition = {
        longitude: position.longitude - longitudeRadius,
        latitude: position.latitude - latitudeRadius
    }
    return db.all("SELECT * FROM locations WHERE type IN ( ? , ? ) AND latitude BETWEEN ? AND ? AND " + 
                "longitude BETWEEN ? AND ? AND longitude IS NOT ? AND latitude IS NOT ? LIMIT 25", 
                type, 'bench', minPosition.latitude, maxPosition.latitude, minPosition.longitude, maxPosition.longitude, 
                position.longitude, position.longitude);
};

module.exports = locations;