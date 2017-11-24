const config = require('./config');
const express = require("express");
const app = express();

/* EndPoints */
const root = require('../src/endpoints/root');

app.get('/', root.handleRequest);

const port = config.getServerPort();
app.listen(port);
console.log(`Server started on port: ${port}`);