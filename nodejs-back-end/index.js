const PORT = 8080;

const express = require('express');
const httpStatusCodes = require('http-status-codes');

let app = express();

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

app.get('/', (req, resp) => {
    resp.status(httpStatusCodes.StatusCodes.OK);
    resp.send('Hello world!');
});