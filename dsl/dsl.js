/**
 *  DSL prototype
 */

var DSL = function () {};

DSL.prototype.runcode = function(codes) {
    
    for (let i in codes) {
        let tmp = codes[i].split(':');
        console.log('tmp ' + tmp);
        this[tmp[0]](tmp[1]);
    }
}

DSL.prototype.get = function(str) {
  console.log("Arg" + str);
}


exports.DSL = DSL;
