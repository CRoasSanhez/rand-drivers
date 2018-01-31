var util = require("../util/util")
var fs = require("fs");

var Driver = {
    id: 0,
    name: "driver_",
    coords: [ 19.410672, -99.16078 ],
    status: "init",

    getDrivers : function(){
        var data = fs.readFileSync( "./app/json/drivers/drivers.json", 'utf8')
        return JSON.parse( data );
    }
}

exports.newInstance = function(){
    return Driver;;
}

exports.getDrivers = function(){
    var data = fs.readFileSync( "./app/json/drivers/drivers.json", 'utf8')
    return JSON.parse( data );
    
}

exports.createDrivers = function(num){

    console.log("drivers")
    if(err = util.deleteJSONFiles("./app/json/drivers"), err != null){
        console.log(err);
        return err;
    }
    var driversList ={};
    for(var i = 1; i<=num; i++){
        uName = "driver_"+i;
        driversList[uName] = {
            name : uName,
            id: i,
            coords: [ 19.410672, -99.16078 ]
        };
    }
    if ( err = util.createJSON("drivers/drivers.json",JSON.stringify(driversList)), err != null){
        console.log(err);
        return err;
    }
    return null;

}

exports.updateCoords = function(id, coords){
    var data = Driver.getDrivers();
    if (typeof data != "object"){
        console.log("ERROR " + data)
        return data
    }
    
    var driver = data["driver_"+id];
    driver.coords = coords;
    delete data["driver_"+id]

    data["driver_"+id] = driver
    if ( err = util.createJSON("drivers/drivers.json",JSON.stringify(data)), err != null){
        console.log(err);
        return err;
    }
    return null;
}

exports.findClosest = function(coords, arrDrivers){
    return closestLocation(coords,arrDrivers);
}

// get user's target location [lat,lng]
// locationData is an array of drivers
function closestLocation(targetLocation, locationData) {
    console.log("\ntarget: "+ targetLocation)
    console.log("Array:" + locationData)
    function vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    // location1 is client coordinates [lat,lng]
    // location2 is driver coordinates [lat,lng]
    function locationDistance(location1, location2) {
        //console.log("location2: "+ location2)
        var dx = location1[0] - location2[0], // latitude
            dy = location1[1] - location2[1]; // longitude

        return vectorDistance(dx, dy);
    }

    return locationData.reduce(function(prev, curr) {
        var prevDistance = locationDistance(targetLocation , prev.coords),
            currDistance = locationDistance(targetLocation , curr.coords);
        return (prevDistance < currDistance) ? prev : curr;
    });
}