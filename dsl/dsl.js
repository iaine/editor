/**
 *  DSL prototype
 */
var config = require('../config.json');
var fs = require('fs');

var DSL = function () {};

var datum = [];

DSL.prototype.init = function() {
  datum = [];
}

DSL.prototype.runcode = function(codes) {
    
    for (let i in codes) {
        console.log("codes :")
        console.log(codes)
        if(codes[i]) {
          let tmp = codes[i].split(':');
          console.log('tmp ' + tmp);
          let args= tmp[1].substring(1,(tmp[1].length-1)).split(',');
          this[tmp[0]].apply(this, args);
        }
    }
}

DSL.prototype.get = function(ftype, str) {
  console.log("File " + ftype)
  switch(ftype) {
    case 'text':
    case 'txt':
      this.data = this.getTxt(datum, str);
      break;
    default:
      console.log('Operation not handled')
  }
}

DSL.prototype.getTxt = function(datum, fname) {
  console.log('in text');
  fs.readFile(config['data'] +'/' + fname.trim(),{flag:'r'}, function(err, data) {
    if (err) console.log("File error: " + err);
       //add data to the array
       datum.push(data);
       console.log("data ");
       console.log(data);
  });
}

exports.DSL = DSL;
