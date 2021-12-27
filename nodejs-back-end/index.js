const PORT = 8080;
const STATIC_PATH = `${__dirname}/static`;
const API_BASE_ROUTE = 'api';

const express = require('express');
const httpStatusCodes = require('http-status-codes');

let app = express();
app.use(express.static(STATIC_PATH));

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

app.get(`/${API_BASE_ROUTE}/*`, (req, resp) => {
    resp.status(httpStatusCodes.StatusCodes.OK);
    resp.send('Hello world!');
});

app.get('/*', (req, resp) => {
    resp.sendFile(`${STATIC_PATH}/index.html`);
});