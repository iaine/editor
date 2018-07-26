var express = require('express');
var router = express.Router();

var editor_controller = require('../controllers/editorController');

/* GET users listing. */
router.get('/', editor_controller.code_edit);

router.get('/about', function(req, res, next) {
  res.send('About editor');
});

router.post('/', editor_controller.code_edit);

module.exports = router;
