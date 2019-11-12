/**
 * Created by diam on 09/08/19.
 */

const express = require('express');
const router = express.Router();

const User = require('./models/user');

router.route('/').get((req, res) => {
   User.find()
       .then(users => res.json(users))
       .catch(err => res.status(400).json('Error : ' + err));
});


router.route('/add').post((req, res) => {
    const username = req.body.username;

    console.log(username);

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;
