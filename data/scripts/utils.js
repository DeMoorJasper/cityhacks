let utils = {};

utils.positionArrayToObject = (coordinates) => {
    if (coordinates.length > 1) {
        return {
            longitude: coordinates[0],
            latitude: coordinates[0]
        };
    }
    return null;
};

utils.multiPolygonCenter = (points) => {
    let longitude = 0;
    let latitude = 0;
    points.forEach(subPoints => {
        subPoints.forEach(subSubPoints => {
            subSubPoints.forEach(point => {
                longitude += point[0];
                latitude += point[1];
            });
        });
    });
    longitude = longitude / points.length;
    latitude = latitude / points.length;
    return {
        longitude: longitude,
        latitude: latitude
    };
};

utils.polygonCenter = (points) => {
    let longitude = 0;
    let latitude = 0;
    points.forEach(subPoints => {
        subPoints.forEach(point => {
            longitude += point[0];
            latitude += point[1];
        });
    });
    longitude = longitude / points.length;
    latitude = latitude / points.length;
    return {
        longitude: longitude,
        latitude: latitude
    };
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
    return {
        longitude: longitude,
        latitude: latitude
    };
};

module.exports = utils;