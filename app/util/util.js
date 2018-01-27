var fs = require("fs")

exports.createJSON = function(fileName, data){
    fs.writeFile( "./app/json/" + fileName, data , 'utf8', function (err) {
        if (err) {
            return err.message;
        }
        console.log('The file has been saved!');
        return null;
    });
}

exports.deleteJSONFiles = function(dirPath){
    
        try { var files = fs.readdirSync(dirPath); }
        catch(e) { return "Error reading path: "+dirPath; }
        if (files.length > 0)
          for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
              fs.unlinkSync(filePath);
            else
            deleteJSONFiles(filePath);
          }
          return null;
}
