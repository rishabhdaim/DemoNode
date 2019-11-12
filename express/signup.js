/**
 * Created by diam on 03/08/19.
 */

var express = require('express');
var router = express.Router();

const Users = [];

// signup of new user
router.get('/signup', function(req, res) {
    res.render('signup', {message: ""});
});

router.post('/signup', function(req, res) {
    if(!req.body.id || !req.body.password) {
        res.status(400);
        res.send("Invalid details!");
    } else {
        Users.filter(function(user) {
            if(user.id === req.body.id) {
                res.render('signup', { message: "User Already Exists! Login or choose another user id"});
            }
        });
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('/protected_page');
    }
});

// login stuff
router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', function(req, res){
    console.log(Users);
    if(!req.body.id || !req.body.password){
        res.render('login', {message: "Please enter both id and password"});
    } else {
        Users.filter(function(user){
            if(user.id === req.body.id && user.password === req.body.password){
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {message: "Invalid credentials!"});
    }
});

module.exports = router;
