const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432
});

pool.on('connect', () => {
    console.log('PG CONNECTED');
});

pool.on('error', (error) => {
    console.log(error);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);
    res.send(artistList);
});

app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

app.get('/song', (req, res) => {
    console.log(`In /song GET`);
    const queryText = `SELECT * FROM "song" ORDER BY "title";`
    pool.query(queryText).then((result) => {
        console.log(result);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

app.post('/song', (req, res) => {
    console.log(req.body);
    // send body to db
    // prepared statement
    const queryText = `
    INSERT INTO "song" ("title", "length", "released")
    VALUES ($1, $2, $3);`

    pool.query(queryText, [req.body.title, req.body.length, req.body.released])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});