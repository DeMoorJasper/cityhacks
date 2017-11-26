const banken = require('./bankenconvertor');
const horeca = require('./horecaconvertor');
const nature = require('./natureconvertor');
const libraries = require('./bibconvertor');
const musea = require('./museaconvertor');
const playforest = require('./playforestsconvertor');
const playgrounds = require('./playgroundconvertor');

(() => {
    banken();
    horeca();
    nature();
    libraries();
    musea();
    playforest();
    playgrounds();
})()