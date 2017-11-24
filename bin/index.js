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

    app.get('/', root.handleRequest);
    app.get('/routing', routing.handleRequest);

    const port = config.getServerPort();
    app.listen(port);
    console.log(`Server started on port: ${port}`);
}

/* CHECK DATABASE */
database.start().then((data) => {
    persistence.checkAll();
    webServer();
}).catch(e => console.log(e));