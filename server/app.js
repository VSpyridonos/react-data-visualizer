require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const ejsMate = require('ejs-mate');
const cors = require('cors');
const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
})

// Connect db
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
})



app.get('/testresponse', async (req, res) => {
    let sql = `SELECT * FROM test`;
    let queryResults;
    db.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        queryResults = [results];
        console.log(results);
        res.send(results);
    });

})

app.get('/data/:countryName', async (req, res) => {
    let countryName = req.params.countryName;
    let countryQuery = `SELECT * FROM data WHERE country_name='${countryName}'`;
    let queryResults;
    db.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        queryResults = [results];
        console.log(results);
        res.send(results);
    });

})


const port = 3001
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});