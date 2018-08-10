var DSL = require("../dsl/dsl.js").DSL;
var dsl = new DSL();
var FileOps = require("../fileops.js").FileOps;
var fo = new FileOps();
const uuidv1 = require('uuid/v1');

var codes = Array();

const title = "Prototype editor";

/**
*  Function to create a list from the code to present back
*  to the UI. Handles the storing of the code in an object
*  @param{Object}req
*  @param{Object}res
*/
exports.code_edit = function(req, res) {
    //title = "SoSA Editor";
    storecode(req.body.son);
    let count = (codes.length > 0) ? codes.join("\n") : "";
    let _id = (req.body.id) ? req.body.id : uuidv1();
    res.render('edit_template', {code:count, title:title,id:_id});
};

/**
*  Method to add the new operation into memory
*  and to also hand off to the DSL code
*  @param{string}
*/
storecode = function(newline) {
   try {
    codes.push(newline);
    //fo.Write(codes);
    dsl.runcode(codes);
    
   } catch (err) {
     console.log("Error: " + err);
   }
}
