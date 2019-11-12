/**
 * Created by diam on 25/07/19.
 */

const express = require('express');
const app = express();
const cors = require('cors');
const things = require('./things.js');
const hello = require('./hello');
const person = require('./person');
const cookie = require('./cookie');
const movies = require('./movies');
const graphql = require('./graphql/index');
const signup = require('./signup');
const checkSignIn = require('./utils').checkSignIn;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const upload = multer();
require('dotenv').config();
const mern = require('./mern/index');

// mongoose.connect('mongodb://localhost/local', { useNewUrlParser: true, useCreateIndex: true });

// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log("Mongo DB database connection established successfully");
// });

// parsing multi-part data request
app.use(upload.array());
// To serve static content
app.use(express.static('public'));
// app.use(express.static('images'));
// Middleware function to log request protocol
app.use('/things', function(req, res, next) {
    console.log("A request for things received at " + Date.now());
    next();
});
//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
//To parse json data
app.use(express.json());
// to parse & use cookies
app.use(cookieParser());
// to use In-Memory storage for session info
app.use(session({secret: "Shh, its a secret!", resave: true, saveUninitialized: true}));
app.use(cors(), bodyParser.json());

// all pages must be in same directory
app.use('', signup);
app.use('/things', things);
app.use('/hello', hello);
app.use('/person', person);
app.use('/cookie', cookie);
app.use('/movies', movies);
app.use('/graphql', graphql);
app.use('/mern', mern);

// Pug Templating engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// protected page via authentication
app.get('/protected_page', checkSignIn, function(req, res){
    res.render('protected_page', {id: req.session.user.id, logout: "/logout"})
});

app.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/login');
});

let message;

app.get('/', function(req, res){
    console.log('Cookies: ', req.cookies);
    if (req.session.page_views) {
        req.session.page_views++;
        message = {viewCount: req.session.page_views, firstVisit: false};
    } else {
        req.session.page_views = 1;
        message = {viewCount: req.session.page_views, firstVisit: true};
    }
    res.render('form', message);
});

app.post('/', function(req, res){
    // console.log(req.body);
    res.send("received your request!");
});

// pug rendering
app.get('/first_template', function(req, res){
    res.render('first_view');
});

app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
        name: "TutorialsPoint", url:"http://www.tutorialspoint.com"
    });
});

app.get('/components', function(req, res){
    res.render('content');
});

// for all types for Http Method
app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this router!");
});

// run last to avoid any issue with other routes
app.get('/:id([0-9]+)', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

// must be defined below the routes to catch errors
app.use('/protected_page', function(err, req, res, next){
    console.error(err.message);
    // User should be authenticated! Redirect him to log in.
    res.redirect('/login');
});

app.use(function (err, req, res, next) {
   console.error(err.stack);
    res.status(500).send('Internal Error On Server');
});

module.exports = app;
