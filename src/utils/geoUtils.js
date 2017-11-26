let geoUtils = {};

function meterPerDegreeLatitude(latitude) {
    return Math.abs(111132.954 - 559.822 * Math.cos(2 * latitude) + 1.175 * Math.cos(4 * latitude));
}

function meterPerDegreeLongitude(longitude) {
    return Math.abs(111132.954 * Math.cos(longitude));
}

geoUtils.meterToLongitude = function(meter, longitude) {
    let delta = meterPerDegreeLongitude(longitude);
    return (1 / delta) * meter;
}

geoUtils.meterToLatitude = function(meter, latitude) {
    let delta = meterPerDegreeLatitude(latitude);
    return (1 / delta) * meter;
}

module.exports = geoUtils;