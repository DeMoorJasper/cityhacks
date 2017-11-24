const root = {};

root.handleRequest = function(req, res) {
    res.send('CityHacks, 24-Hours of hacking for Brugge.');
};

module.exports = root;