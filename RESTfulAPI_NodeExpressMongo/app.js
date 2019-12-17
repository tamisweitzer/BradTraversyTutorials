
var express = require('express'),
    app = express();
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

    // Connect to mongoose
    mongoose.connect('mongodb://localhost/books');
    var db = mongoose.connection;

    app.get('/', function(req, res) {
      res.send('Please use /api/books');
    });

    app.listen(3000);
    console.log('i\'m running on 3000');
