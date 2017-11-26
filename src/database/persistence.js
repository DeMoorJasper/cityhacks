const fs = require('fs');
const locations = require('./locations');

let persistence = {};

persistence.checkAll = function() {
    return new Promise((resolve, reject) => {
        locations.initTable().then(data => {
            console.log("[DB]: Table initialised");
            let count = 0;
            fs.readdir('./data/converted/', (err, files) => {
                if (err) return reject(err);
                files.forEach((file) => {
                    let extension = file.substring(file.lastIndexOf('.') + 1, file.length) || file;
                    if (extension !== "json") return true;
                    locations.importData(`./data/converted/${file}`)
                    .then(() => {
                        count--;
                        console.log(`[DB]: content of ${file} imported/checked.`);
                        if (count === 0) resolve();
                    }).catch(e => reject(e));
                    count++;
                });
            });
        }).catch(e => reject(e));
    });
};

module.exports = persistence;