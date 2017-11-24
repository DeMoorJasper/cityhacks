const config = require('./config');
const express = require('express');
const database = require('../src/database/database');
const persistence = require('../src/database/persistence');

function webServer() {
    /* START WEBSERVER */
    const app = express();

    /* EndPoints */
    const root = require('../src/endpoints/root');
    const routing = require('../src/endpoints/routing');
    const search = require('../src/endpoints/search');

    app.get('/', root.handleRequest);
    app.get('/routing', routing.handleRequest);
    app.get('/search', search.handleRequest);

    const port = config.getServerPort();
    app.listen(port);
    console.log(`Server started on port: ${port}`);
}

/* CHECK DATABASE */
database.start().then((data) => {
    console.log("==== CHECKING DATABASE ====");
    persistence.checkAll().then(() => {
        console.log("==== STARTING WEBSERVER ====");
        webServer();
    }).catch((e) => {
        console.log("Error accured while checking database.");
        console.log(e);
    });
}).catch(e => console.log(e));