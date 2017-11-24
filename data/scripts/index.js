const banken = require('./bankenconvertor');
const horeca = require('./horecaconvertor');
const nature = require('./natureconvertor');

(() => {
    banken();
    horeca();
    nature();
})()