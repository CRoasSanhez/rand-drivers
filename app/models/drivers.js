var util = require("../util/util")

var Driver = {
    id: 0,
    name: "driver_",
    coords: [ 19.410672, -99.16078 ],

    getDrivers : function(){
        var data = fs.readFileSync( "./app/json/drivers/drivers.json", 'utf8')
        return JSON.parse( data );
    }
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
    var data = User.getUsers();
    if (typeof data != "object"){
        console.log("ERROR " + data)
        return data
    }
    
    var user = data["driver_"+id];
    user.coords = coords;
    delete data["driver_"+id]

    data["driver_"+id] = user
    if ( err = util.createJSON("drivers/drivers.json",JSON.stringify(data)), err != null){
        console.log(err);
        return err;
    }
    return null;
}