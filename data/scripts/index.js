const banken = require('./parsers/bankenconvertor');
const horeca = require('./parsers/horecaconvertor');
const nature = require('./parsers/natureconvertor');
const libraries = require('./parsers/bibconvertor');
const musea = require('./parsers/museaconvertor');
const playforest = require('./parsers/playforestsconvertor');
const playgrounds = require('./parsers/playgroundconvertor');

(() => {
    banken();
    horeca();
    nature();
    libraries();
    musea();
    playforest();
    playgrounds();
})()