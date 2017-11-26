export function gpsLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                return resolve(position);
            });
        } else {
            return reject("Geolocation unavailable");
        }
    });
}