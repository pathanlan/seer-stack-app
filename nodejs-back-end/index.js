const PORT = 8080;
const STATIC_PATH = `${__dirname}/static`;
const API_BASE_ROUTE = 'api';

const express = require('express');
const lib_hsc = require('http-status-codes');
const lib_bodyparser = require('body-parser');

const database = require('./database');

let app = express();
app.use(express.static(STATIC_PATH));
app.use(lib_bodyparser.json());

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

app.get(`/${API_BASE_ROUTE}/pets`, (req, resp) => {
    database.all('SELECT * FROM pets', [], (err, rows) => {
        if(!err) {
            resp.status(lib_hsc.StatusCodes.OK)
                .json(rows);
        } else {
            const errorMessage = 'There was an error when retrieving values from the database';
            console.error(errorMessage, err);
            resp.status(lib_hsc.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    'success': false,
                    'message': errorMessage
                });
        }
    });
});

app.post(`/${API_BASE_ROUTE}/pet`, (req, resp) => {
    database.run(`INSERT INTO pets (name, age) VALUES (?, ?)`, 
                [req.body.name, req.body.age], 
                (err) => {
        if(!err) {
            resp.sendStatus(lib_hsc.StatusCodes.CREATED);
        } else {
            const errorMessage = 'There was an error when creating the entity in the database';
            console.error(errorMessage, err);
            resp.status(lib_hsc.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    'success': false,
                    'message': errorMessage
                });
        }
    });
});

app.put(`/${API_BASE_ROUTE}/pet`, (req, resp) => {
    database.run(`UPDATE pets SET name = ?, age = ? WHERE id = ?`, 
                [req.body.name, req.body.age, req.body.id], 
                (err) => {
        if(!err) {
            resp.sendStatus(lib_hsc.StatusCodes.NO_CONTENT);
        } else {
            const errorMessage = 'There was an error when updating the entity in the database';
            console.error(errorMessage, err);
            resp.status(lib_hsc.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    'success': false,
                    'message': errorMessage
                });
        }
    });
});

app.delete(`/${API_BASE_ROUTE}/pet`, (req, resp) => {
    database.run(`DELETE FROM pets WHERE id = ?`, 
                [req.query.id], 
                (err) => {
        if(!err) {
            resp.sendStatus(lib_hsc.StatusCodes.NO_CONTENT);
        } else {
            const errorMessage = 'There was an error when removing the entity from the database';
            console.error(errorMessage, err);
            resp.status(lib_hsc.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    'success': false,
                    'message': errorMessage
                });
        }
    });
});

app.get(`/${API_BASE_ROUTE}*`, (req, resp) => {
    resp.status(lib_hsc.StatusCodes.OK)
        .send('Hello world!');
});