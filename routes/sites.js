

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var whoisTOOL = require('../tools/whois.js');
var httpTOOL = require('../tools/http_get.js');

/*
    all routes enter through endpoint /sites
    - get all
        /
    - add new
        /new
    - get one
        /:name
    - del one
        /remove/:name
    - edit one
        /edit/:name
*/

// GET ALL sites listing. - READ
router.get('/', function(req, res, next) {

    // to serve the updated info after an insert

    httpTOOL.verifySiteStatus();
    mongoose.model('Site').find({}, function (err, sites) {
        if (err) {
            res.send(console.error(err));
        } else {
            // console.log("debug 1 : " + sites);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(sites));
        }
    });
});

// GET a single site - READ
router.get('/:name', function(req, res, next) {

    var searchName = req.params.name;

    mongoose.model('Site').find({name: searchName}, function (err, sites) {
        if (err) {
            res.send(console.error(err));
        } else {
            res.send(sites);
        }
    });
});

// ADD a new site - CREATE
router.post('/new', function(req, res, next) {

    // get the data off the request body
    var name = req.body.name;
    var url = req.body.url;
    var keyword = req.body.keyword;

    // TODO: get the domain expire data before storing

    // var whois_info = whoisTOOL.getWHOISinfo(url);
    // console.log("DEBUG whois info ROUTE: " + whois_info);

    // create and store on database
    mongoose.model('Site').create({
        name : name,
        url: url,
        keyword: keyword
    }, function (err, site) {
        if (err) {
            console.log("DEBUG: "+err);
            res.send("There was a problem adding the information to the database.");
            httpTOOL.verifySiteStatus();
        } else {
            // console.log('POST creating new site: ' + site);
            res.send('POST creating new site: ' + site.name);
        }
    });


});

// REMOVE a site - DELETE
router.delete('/remove',function(req, res, next) {

    var searchName = req.body.name;

    mongoose.model('Site').remove(
        {name: searchName},
        function (err, msg) {
            if (err) {
                // res.send("ERROR: "+
                console.error(err);
            // );
            } else {
                // console.log(msg);
                res.send('removed sucessfully ' + searchName);
            }
        });
});

// EDIT a site - UPDATE
router.put('/edit', function(req, res, next) {

    var searchname = req.body.name;
    var new_url = req.body.url;
    var new_keyword = req.body.keyword;

    mongoose.model('Site').findOneAndUpdate(
        {   name: searchname },
        {   url: new_url,
            keyword: new_keyword },
        function (err, site) {
            if (err) {
                console.error(err);
            } else {
                res.send("update sucessfull record : " + site.name);
            }
        }
    );

    // httpTOOL.verifySiteStatus();
    // console.log("DEBUG then OK runned");

});

module.exports = router;
