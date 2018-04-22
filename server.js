var express = require('express'); 
var app = express(); 
var port = process.env.PORT || 3000; 
var morgan = require('morgan'); 
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser'); 
var router = express.Router(); 

var path = require('path'); 

app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public')); 

mongoose.connect('mongodb://127.0.0.1:27017/mean', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err ); 
    } else {
        console.log('Successfully connected to MongoDB');
        var db=mongoose.connection;
        var appRoutes = require('./app/routes/index')(router,db);
        db.collection('users').find().forEach(function(value){
        	console.log(value);
        })
        app.use('/api', appRoutes);
        app.listen(port, function() {
		    console.log('Running the server on port ' + port);
		}); 
    }
});


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

