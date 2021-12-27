const PORT = 8080;
const STATIC_PATH = `${__dirname}/static`;
const API_BASE_ROUTE = 'api';

const express = require('express');
const lib_hsc = require('http-status-codes');
const database = require('./database');

let app = express();
app.use(express.static(STATIC_PATH));

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

app.get(`/${API_BASE_ROUTE}/pets`, (req, resp) => {
    database.all('SELECT * FROM pets', [], (err, rows) => {
        if(!err) {
            resp.status(lib_hsc.StatusCodes.OK)
                .json({ 'message': 'success', 'data': rows });
        } else {
            console.error('There was an error when retrieving values from the database', err);
        }
    });
});

app.get(`/${API_BASE_ROUTE}*`, (req, resp) => {
    resp.status(lib_hsc.StatusCodes.OK)
        .send('Hello world!');
});