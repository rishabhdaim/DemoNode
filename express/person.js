/**
 * Created by diam on 03/08/19.
 */

var express = require('express');
var isEmpty = require('./utils').isEmpty;
var router = express.Router();
var mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

const Person = mongoose.model("Person", personSchema);

// render create person template
router.get('/', function(req, res) {
    res.render('person')
});

// create person call handler
router.post('/', function(req, res) {
    var personInfo = req.body; // Get the parsed information

    console.log(personInfo);

    if(isEmpty(personInfo.name) || isEmpty(personInfo.age) || isEmpty(personInfo.nationality)) {
        res.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        newPerson.save(function(err, Person) {
            if(err)
                res.render('show_message', {message: "Database error", type: "error"});
            else
                res.render('show_message', {message: "New person added", type: "success", person: personInfo});
        });
    }
});

// fetch all records
router.get('/all', function(req, res) {
   Person.find(function (err, response) {
       res.json(response);
   })
});

// update record by Id
router.put('/:id', function(req, res){
    // console.log(req.params.id);
    // console.log(req.body);
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
        if(err) res.json({message: "Error in updating person with id " + req.params.id});
        res.json(response);
    });
});

// delete by record id
router.delete('/:id', function(req, res){
    Person.findByIdAndRemove(req.params.id, function(err, response){
        if(err) res.json({message: "Error in deleting record id " + req.params.id});
        else res.json({message: "Person with id " + req.params.id + " removed."});
    });
});

//export this router to use in our bookAuthor.js
module.exports = router;