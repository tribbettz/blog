// Server file leveraging Express.js for personal blog
// @author: tribbettz


const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

var db;
var db_url = 'mongodb://localhost:27017/blog';
MongoClient.connect(db_url, (err, database) => {
    if (err) {return console.log(err)}
    db = database;
    app.listen(3000, function() {
        console.log('listening on port 3000')
    })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) {return console.log(err)};
        res.render('index.ejs', {quotes: result});
    })
    var cursor = db.collection('quotes').find();
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) {return console.log(err)}
        console.log('saved to database');
        res.redirect('/');
    })
    console.log(req.body)
})
