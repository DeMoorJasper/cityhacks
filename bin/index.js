const config = require('./config');
const express = require('express');
const app = express();

/* EndPoints */
const root = require('../src/endpoints/root');
const routing = require('../src/endpoints/routing');

app.get('/', root.handleRequest);
app.get('/routing', routing.handleRequest);

const port = config.getServerPort();
app.listen(port);
console.log(`Server started on port: ${port}`);