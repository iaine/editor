/**
 *  DSL prototype
 */
var config = require('../config.json');
var fs = require('fs');
var audioCtx = new AudioContext();

var DSL = function () {
  this.datum = [];
};

var datum = [];
var mapping = [];

DSL.prototype.init = function() {
  datum = [];
}

DSL.prototype.runcode = function(codes) {
    
    for (let i in codes) {
        console.log("codes :")
        console.log(codes)
        if(codes[i]) {
          let tmp = codes[i].split(':');
          console.log('tmp ' + tmp[1]);
          
          let args= Array.from(tmp[1].substring(1,(tmp[1].length-1)).split(','));
          //this[tmp[0]].apply(this, args);
          this[tmp[0]](args);
          console.log(this.datum);
          console.log(mapping);
        }
    }
}

/**
*  Push the given data into the datum part of the object
*/
DSL.prototype.data = function(dataArr) {
   console.log(typeof(dataArr));
   if (dataArr.length < 1) {
     console.log("DataError : Empty array provided ");
   }
   this.datum.push(dataArr);
}

/**
*  Factory style for loading the mappings
*/
DSL.prototype.mapping = function() {
   let notemap = [];
   datum.forEach( function(y){
     let ynote = JSON.stringify({ "note": 261.25, 'dur': 0.75, 'gain': 0.5});  
     mapping.push(ynote);
   });
}

DSL.prototype.note = function() {
      let oscillator = audioCtx.createOscillator();

      let osc2 = audioCtx.createOscillator();

      osc2.connect(audioCtx.destination);
      oscillator.connect(audioCtx.destination);
      let id = 0;
      mapping.forEach( function(y) {
       let _t = ++id;
       let gainNode = audioCtx.createGain();
       gainNode.connect(audioCtx.destination);
       gainNode.gain.setValueAtTime(y.gain, _t);
       gainNode.gain.exponentialRampToValueAtTime(y.gain, _t + y.dur);
       //gainNode.gain.value = volume;

       oscillator.connect(gainNode);
       osc2.connect(gainNode);

       oscillator.type = "sine";
       oscillator.frequency.setValueAtTime(y.freq, _t);
       oscillator.frequency.exponentialRampToValueAtTime(y.dur * 1.5, _t + y.dur);

       //osc2.frequency.setValueAtTime(y.freq, _t);
       //osc2.frequency.exponentialRampToValueAtTime((2*y.freq), _t + y.dur);

       oscillator.start(_t);
       oscillator.stop(_t + y.dur);

       osc2.start(_t);
       osc2.stop(_t + y.dur);
      });
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

  fs.readFile(config['data'] +'/' + fname.trim(),{flag:'r'}, function(err, data) {
    if (err) console.log("File error: " + err);
       //add data to the array
       datum.push(data);
       console.log("data ");
       console.log(data);
  });
}

exports.DSL = DSL;
