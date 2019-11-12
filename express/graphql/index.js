/**
 * Created by diam on 04/08/19.
 */


const express = require('express');
const router = express.Router();
const studentCollege = require('./studentCollege');
const bookAuthor = require('./bookAuthor');

router.use('/bookAuthor', bookAuthor);
router.use('/studentCollege', studentCollege);

// export this router to use in our bookAuthor.js
module.exports = router;
