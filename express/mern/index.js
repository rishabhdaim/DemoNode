/**
 * Created by diam on 09/08/19.
 */

const express = require('express');
const router = express.Router();
const exercise = require('./exercise');
const user = require('./user');

router.use('/exercise', exercise);
router.use('/user', user);

module.exports = router;
