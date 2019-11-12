/**
 * Created by diam on 25/07/19.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('GET router on things.');
});
router.post('/', function(req, res){
    res.send('POST router on things.');
});

router.get('/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

//export this router to use in our bookAuthor.js
module.exports = router;