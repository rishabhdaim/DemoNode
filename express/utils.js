/**
 * Created by diam on 03/08/19.
 */

var exports = module.exports = {};

exports.checkSignIn = function(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!!!!");
        console.log(req.session.user);
        next(err);  // Error, trying to access unauthorized page!
    }
};

exports.isEmpty = function(str) {
    return (!str || 0 === str.length);
};