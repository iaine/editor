var fs = require("fs");
var path = require('path');

var FileOps = function() {};

FileOps.prototype.Write = function(data) {
   let tmp = JSON.stringify(data);
   console.log(tmp);
   let nowTime = Date.now();

   let fname = "tmp/" + nowTime + ".json";

   //if (!fs.existsSync(fname)) { fs. }

   fs.writeFile(path.join(__dirname, fname), tmp, {flag:'w'}, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
   });
}


exports.FileOps = FileOps;
