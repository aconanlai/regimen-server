const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  db.collection('msgs').find().toArray((err, results) => {
    res.json(results);
  });
});

// curl -d "param1=value1&param2=value2" -X POST https://regimen-server-zeaktioidb.now.sh/
app.post('/', (req, res) => {
  db.collection('msgs').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to db');
    res.json('success');
  });
});

MongoClient.connect(config.mongo, (err, database) => {
  if (err) return console.log(err);
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});
