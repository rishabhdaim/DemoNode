/**
 * Created by diam on 03/08/19.
 */

var express = require('express');
var router = express.Router();

// set cookies
router.get('/', function (req, res) {
    res.cookie('name1', 'express1'); // Sets name = express
    res.cookie('name', 'express').send('cookie set'); // Sets name = express
});

router.get('/clear', function (req, res) {
    res.clearCookie('name');
    res.send('cookie foo cleared');
});


module.exports = router;
