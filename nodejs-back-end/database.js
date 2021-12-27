const DBSOURCE = "db.sqlite";

const lib_sqlite = require('sqlite3').verbose();

let database = new lib_sqlite.Database(DBSOURCE, (err) => {
    if(!err) {
        console.log('Connected to the database');
        createTestTable(database);
    } else {
        console.error('There was an error when connecting to the database', err);
        throw err;
    }
});

function createTestTable(database) {
    database.run(`CREATE TABLE pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        age INTEGER
    )`, (err) => {
        if(!err) {
            const insertTemplate = 'INSERT INTO pets (name, age) VALUES (?,?)';
            database.run(insertTemplate, ['Cocoa', 2]);
            database.run(insertTemplate, ['Bella', 5]);
        }
    })
}

module.exports = database;