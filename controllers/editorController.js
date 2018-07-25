var DSL = require("../dsl.js").DSL;
var dsl = new DSL();
var count = "";
var codes = Array();

// Display Editor code
exports.code_view = function(req, res) {
    res.render('edit_template', {title: "SoSA Editor"});
};

// Handle Editor code
exports.code_edit = function(req, res) {
    title = "SoSA Editor";
    storecode(req.body.son);
    count = codes.join("\n");
    res.render('edit_template', {code:count, title:title});
};
storecode = function(newline) {
    codes.push(newline);
    console.log(JSON.stringify(codes));
    runcode()
}

runcode = function() {
    let tmpcodes = codes;
    for (let i in tmpcodes) {
        let tmp = tmpcodes[i].split(':');
        console.log('tmp ' + tmp);
        if (tmp[0] == "get") {
          dsl.get(tmp[1]);
        }
    }
}
