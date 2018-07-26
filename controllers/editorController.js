var DSL = require("../dsl.js").DSL;
var dsl = new DSL();
var count = "";
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
    count = (codes.length > 0) ? codes.join("\n") : "";
    res.render('edit_template', {code:count, title:title});
};

/**
*  Method to add the new operation into memory
*  and to also hand off to the DSL code
*  @param{string}
*/
storecode = function(newline) {
   try {
    codes.push(newline);
    dsl.runcode(codes);
   } catch (err) {
     console.log("Error: " + err);
   }
}
