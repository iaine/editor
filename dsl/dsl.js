/**
 *  DSL prototype
 */

var DSL = function () {};

DSL.prototype.init = function() {
  this.data = [];
}

DSL.prototype.runcode = function(codes) {
    
    for (let i in codes) {
        let tmp = codes[i].split(':');
        console.log('tmp ' + tmp);
        let args= tmp[1].substring(1,(tmp[1].length-1)).split(',');
        this[tmp[0]].apply(this, args);
    }
}

DSL.prototype.get = function(ftype, str) {
  console.log("File " + ftype)
  switch(ftype) {
    case 'text':
    case 'txt':
      this.data = this.getTxt(str);
      break;
    default:
      console.log('Operation not handled')
  }
}

DSL.prototype.getTxt = function(fname) {
  console.log('in text');
}

exports.DSL = DSL;
