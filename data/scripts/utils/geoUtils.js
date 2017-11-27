const ROUND_DECIMALS = 6;

let utils = {};

utils.roundPosition = (position) => {
    return {
        longitude: parseFloat(position.longitude.toFixed(ROUND_DECIMALS)),
        latitude: parseFloat(position.latitude.toFixed(ROUND_DECIMALS))
    }
}

utils.positionArrayToObject = (coordinates) => {
    if (coordinates.length > 1) {
        return utils.roundPosition({
            longitude: coordinates[0],
            latitude: coordinates[1]
        });
    }
    return null;
};

utils.multiPolygonCenter = (points) => {
    let longitude = 0;
    let latitude = 0;
    let count = 0;
    points.forEach(subPoints => {
        subPoints.forEach(subSubPoints => {
            subSubPoints.forEach(point => {
                longitude += point[0];
                latitude += point[1];
                count++;
            });
        });
    });
    longitude = longitude / count;
    latitude = latitude / count;
    return utils.roundPosition({
        longitude: longitude,
        latitude: latitude
    });
};

utils.polygonCenter = (points) => {
    let longitude = 0;
    let latitude = 0;
    let count = 0;
    points.forEach(subPoints => {
        subPoints.forEach(point => {
            longitude += point[0];
            latitude += point[1];
            count++;
        });
    });
    longitude = longitude / count;
    latitude = latitude / count;
    return utils.roundPosition({
        longitude: longitude,
        latitude: latitude
    });
};

utils.multipointCenter = (points) => {
    let longitude = 0;
    let latitude = 0;
    points.forEach(point => {
        longitude += point[0];
        latitude += point[1];
    });
    longitude = longitude / points.length;
    latitude = latitude / points.length;
    return utils.roundPosition({
        longitude: longitude,
        latitude: latitude
    });
};

module.exports = utils;