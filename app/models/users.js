var util = require("../util/util")
var fs = require("fs");

var User = {
    name : "user_",
    id: 0,
    coords: [ 19.410672, -99.16078 ],

    getUsers : function(){
        var data = fs.readFileSync( "./app/json/users/users.json", 'utf8')
        return JSON.parse( data );
    }
}

exports.getUser = function(id){

}

exports.createUsers = function(num){
    console.log("users")

    if(err = util.deleteJSONFiles("./app/json/users"), err != null){
        console.log(err);
        return err;
    }

    var userList ={};
    for(var i = 1; i<=num; i++){
        uName = "user_"+i;
        userList[uName] = {
            name : uName,
            id: i,
            coords: [ 19.410672, -99.16078 ]
        };
    }
    if ( err = util.createJSON("users/users.json",JSON.stringify(userList)), err != null){
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
    
    var user = data["user_"+id];
    user.coords = coords;
    delete data["user_"+id]

    data["user_"+id] = user
    if ( err = util.createJSON("users/users.json",JSON.stringify(data)), err != null){
        console.log(err);
        return err;
    }
    return null;
}
