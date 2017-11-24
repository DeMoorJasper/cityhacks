const db = require('sqlite');
const database = require('./database');

let locations = {};

locations.initTable = function() {
    return db.run("CREATE TABLE IF NOT EXISTS locations (type varchar(100), " +
        "subType varchar(100), description varchar(250), amount int(5), " +
        "longitude FLOAT(250), latitude FLOAT(250));");
};

locations.insert = function(location) {
    let type = location.type ? `${database.removeQuote(location.type)}` : "NULL";
    let subType = location['sub-type'] ? `${database.removeQuote(location['sub-type'])}` : "NULL";
    let description = location.description ? `${database.removeQuote(location.description)}` : "NULL";
    let amount = location.amount ? `${location.amount}` : 0;
    let longitude = location.position.longitude ? `${location.position.longitude}` : 0;
    let latitude = location.position.latitude ? `${location.position.latitude}` : 0;
    let query = `INSERT OR IGNORE INTO locations (type, subType, description, amount, longitude, latitude) ` + 
    `VALUES('${type}', '${subType}', '${description}', '${amount}', '${longitude}', ${latitude});`;
    return db.run(query);
};

locations.search = function(query, page) {
    query = `%${query}%`;
    page = page ? page : 0;
    return db.all("SELECT * FROM locations WHERE description LIKE ? LIMIT 25 OFFSET ?", query, page);
};

module.exports = locations;