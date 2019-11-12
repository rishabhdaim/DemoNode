/**
 * Created by diam on 25/07/19.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('GET router on Hello.');
});
router.post('/', function(req, res){
    res.send('POST router on Hello.');
});

//export this router to use in our bookAuthor.js
module.exports = router;