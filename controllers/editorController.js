var DSL = require("../dsl.js").DSL;
var dsl = new DSL();
var count = "";
var codes = Array();


/**
* Handles the initial view
*  @param{Object}req
*  @param{Object}res
*/
exports.code_view = function(req, res) {
    res.render('edit_template', {title: "SoSA Editor"});
};

/**
*  Function to create a list from the code to present back
*  to the UI. Handles the storing of the code in an object
*  @param{Object}req
*  @param{Object}res
*/
exports.code_edit = function(req, res) {
    title = "SoSA Editor";
    storecode(req.body.son);
    count = codes.join("\n");
    res.render('edit_template', {code:count, title:title});
};

/**
*  Method to add the new operation into memory
*  and to also hand off to the DSL code
*  @param{string}
*/
storecode = function(newline) {
    codes.push(newline);
    dsl.runcode(codes);
}
