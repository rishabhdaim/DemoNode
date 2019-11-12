/**
 * Created by diam on 27/07/19.
 */

var app = require('../express/index'); //Require our app

app.set('port', process.env.PORT || 5000);

console.log(process.env);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
