var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var multer  = require('multer');
var fs = require("fs");
var cookieParser = require('cookie-parser');

// Create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(multer({ dest: '/tmp/'}));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   printReq(req);
   res.send('Hello World');
});

app.get('/index.htm', function (req, res) {
   printReq(req);   
   res.sendFile( __dirname + "/" + "index.htm" );
});

app.get('/post.htm', function (req, res) {
   printReq(req);   
   res.sendFile( __dirname + "/" + "post.htm" );
});

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   printReq(req);
   console.log(response);
   res.end(JSON.stringify(response));
});

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
});

app.post('/file_upload', function (req, res) {
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   printReq(req);
   var file = __dirname + "/" + req.files.file.name;
   
   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
});

app.post('/process_post', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   printReq(req);
   console.log(response);
   res.end(JSON.stringify(response));
});

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
});

app.get('/listUsers', function (req, res) {
	printReq(req);
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
});

function printReq(req) {
   console.log(req.headers);
   console.log('----------------------');
   console.log(req.app);
   console.log(req.url);
   console.log('----------------------');
   console.log(req.baseUrl);
   console.log(req.body);
   console.log('----------------------');
   console.log(req.cookies);
   console.log(req.fresh);
   console.log('----------------------');
   console.log(req.hostname);
   console.log(req.ip);
   console.log('----------------------');
   console.log(req.ips);
   console.log(req.originalUrl);
   console.log('----------------------');
   console.log(req.params);
   console.log(req.path);
   console.log('----------------------');
   console.log(req.protocol);
   console.log(req.query);
   console.log('----------------------');
   console.log(req.route);
   console.log(req.secure);
   console.log('----------------------');
   console.log(req.signedCookies);
   console.log(req.stale);
   console.log('----------------------');
   console.log(req.subdomains);
   console.log(req.xhr);
   console.log('----------------------');
   req.accepts('html');
   req.accepts('html');
   req.accepts('text/html');
   console.log('----------------------');
   req.get('Content-Type');
   req.get('content-type');
   req.get('Something');
   console.log('----------------------');
   req.is('html');
   req.is('text/html');
   req.is('text/*');
   console.log('----------------------');
}

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port)
});