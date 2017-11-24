const banken = require('./bankenconvertor');
const horeca = require('./horecaconvertor');

(() => {
    banken();
    horeca();
})()