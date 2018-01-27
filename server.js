var express = require('express');
var users = require("./app/models/users");
var drivers = require("./app/models/drivers");
var bodyParser = require("body-parser");
var app = express();

var GoogleMapsJSApi =  "AIzaSyDI8Osr696gx40sqjWaNg9f6EDvcFLgYGQ"

// indicates the static resources form app
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get homepage
app.get('/index.htm', function (req, res) {
   res.sendFile( "/index.htm" );
})

// Creates users and drivers for the app
app.post('/map', function (req, res) {
    var n_users = req.body.users;
    var n_drivers = req.body.drivers;
    if(n_drivers ==0 || n_users == 0){
        console.log("Error invalid data")
        res.redirect( "/index.htm" );
    }
   
    if(err = users.createUsers(n_users), err != null){
        res.redirect( "/index.htm" );
    }

    if(err = drivers.createDrivers(n_drivers), err != null){
        res.redirect( "/index.htm" );
    }
   
    console.log("success")
    res.redirect( "/index.htm" );
})

// updates user coordinates
app.patch("/users/coords/:id",function(req,res){
    coords = req.body
    var id = parseInt(req.params.id);
    if( !Array.isArray( coords.coords ) || coords.coords.length != 2 || typeof id != "number" ){
        console.log("Error invalid data")
        res.redirect( "/index.htm" );
    }

    if (err = users.updateCoords(id, coords.coords), err!= null){
        res.redirect( "/index.htm" );
    }
    console.log("success"),
    res.redirect( "/index.htm" );
})

// updates user coordinates
app.patch("/drivers/coords/:id",function(req,res){
    coords = req.body
    var id = parseInt(req.params.id);
    if( !Array.isArray( coords.coords ) || coords.coords.length != 2 || typeof id != "number" ){
        console.log("Error invalid data")
        res.redirect( "/index.htm" );
    }

    if (err = drivers.updateCoords(id, coords.coords), err!= null){
        res.redirect( "/index.htm" );
    }
    console.log("success"),
    res.redirect( "/index.htm" );
})


// start listening por 8081
var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)
})