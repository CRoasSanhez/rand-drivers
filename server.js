var express = require('express');
var bodyParser = require("body-parser");

var users = require("./app/models/users");
var drivers = require("./app/models/drivers");
var responses = require("./app/models/responses");

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
        console.log("ERROR /map invalid data");
        res.redirect( "/index.htm" );
    }
   
    if(err = users.createUsers(n_users), err != null){
        console.log("ERROR Creating users --- "+ err);
        res.redirect( "/index.htm" );
    }

    if(err = drivers.createDrivers(n_drivers), err != null){
        console.log("ERROR Creating drivers --- "+ err);
        res.redirect( "/index.htm" );
    }
   
    res.end( JSON.stringify(responses.successResponse("success", 200, "Documents created")) );
})

// updates user coordinates
app.patch("/users/coords/:id",function(req,res){
    var coords = req.body.coords;
    var id = parseInt(req.params.id);
    console.log(coords)
    if( typeof coords.lat != "number" || typeof coords.lng != "number" || typeof id != "number" ){
        console.log("ERROR /users/coords/"+id+" invalid data"),
        res.end( JSON.stringify(responses.badRequest("Invalid data", 200, "Bad Request")) );
    }

    if (err = users.updateCoords(id, [coords.lat, coords.lng]), err!= null){
        res.end( JSON.stringify(responses.serverError()));
    }
    res.end( JSON.stringify(responses.successResponse("success", 200, "User updated")) );
})

// updates driver coordinates
app.patch("/drivers/coords/:id",function(req,res){
    var coords = req.body.coords
    var id = parseInt(req.params.id);
    console.log(coords);
    if( typeof coords.lat != "number" || typeof coords.lng != "number" || typeof id != "number" ){
        console.log("ERROR /drivers/coords/"+id+" invalid data"),
        res.end( JSON.stringify(responses.badRequest("Invalid data", 200, "Bad Request")) );
    }

    if (err = drivers.updateCoords(id, [coords.lat, coords.lng]), err!= null){
        res.end( JSON.stringify(responses.serverError()));
    }
    res.end( JSON.stringify(responses.successResponse("success", 200, "Driver updated")) );
})

// Handle get nearest driver request from user
app.post("/users/:idUser/driver",function(req,res){
    var coords = req.body.coords
    var idUser = parseInt(req.params.idUser);

    if( typeof idUser != "number" || !Array.isArray(coords) || coords.length!=2){
        console.log("ERROR /users/"+idUser+"/driver invalid data"),
        res.end( JSON.stringify(responses.badRequest("Invalid data", 200, "Bad Request")) );
    }

    // retreive user from storage
    var mDriver, arrDrivers = [], dName;
    var user = users.getUser(idUser)
    var mDrivers = drivers.getDrivers();

    for (var driver in mDrivers) {
        if (mDrivers.hasOwnProperty(driver)) {
            arrDrivers.push(mDrivers[driver])
        }
    }

    if (arrDrivers.length >0){
        if (mDriver = drivers.findClosest(user.coords,arrDrivers), typeof mDriver != "object"){
            res.end( JSON.stringify(responses.serverError()));
        }
    }

    console.log(mDriver);

    res.end( JSON.stringify(responses.successResponse( mDriver, 200, "success")) );
})


// start listening on por 8081
var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Listening at http://%s:%s", host, port)
})