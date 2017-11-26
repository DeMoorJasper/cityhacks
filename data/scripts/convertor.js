const fs = require('fs');

const convert = (source, destination, dataHandler) => {
    return new Promise((resolve, reject) => {
        let converted = [];
        fs.readFile(source, "utf8", (err, data) => {
            if (err) return reject(err);
            data = JSON.parse(data);
            converted = data.map(dataHandler).filter((record) => !(record === null || record === undefined));
            fs.writeFile(destination, JSON.stringify(converted, null, '\t'), (err) => {
                if (err) return reject(err);
                resolve();
            });
        })
    });
}

module.exports = convert;