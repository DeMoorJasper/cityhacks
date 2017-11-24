const db = require('sqlite');

let database = {};

database.start = function() {
    return db.open('./databases/database.sqlite');
};

/**
 * Escape quotes to input into the db (do not use this to escape SQL injection or anything a user can input!!)
 * @param {*} string the string we need to purify of quotes 
 */
database.removeQuote = function(string) {
    return string.replace(/\'/g, "''");
};

module.exports = database;