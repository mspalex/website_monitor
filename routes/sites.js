

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var validator = require('validator'); //https://www.npmjs.com/package/valid-url
var validurl = require('valid-url');

//user functions
var whoisTOOL = require('../tools/whois.js');
var httpTOOL = require('../tools/http_get.js');

/*
    THIS FILE CONTAINS THE CRUD HTTP REST API TO SERVE SITES
*/

// GET ALL sites listing. - READ
router.get('/', function(req, res, next) {

    // to serve the updated info after an insert

    httpTOOL.verifyAllSitesStatus();

    mongoose.model('Site').find({}, function (err, sites) {
        if (err) {
            res.send(console.error(err));
        } else {
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

    var name = "";
    var url = "";
    var keyword = "";

    if(!validator.isEmpty(req.body.name)){
        name = req.body.name;

        if(validator.isURL(req.body.url,['http']) && validurl.isWebUri(req.body.url)){
            url = req.body.url;

            // console.log('DEBUG isWebUri : ' + validurl.isWebUri(url));
            // console.log("DEBUG isURL : " + validator.isURL(url,['http']));
            // console.log("DEBUG liveness url: " + httpTOOL.validateURLliveness(req.body.url));

            if (!validator.isEmpty(req.body.keyword)) {
                keyword = req.body.keyword;

                // create and store on database
                mongoose.model('Site').create({
                    name : name,
                    url: url,
                    keyword: keyword
                }, function (err, site) {
                    if (err && err.code !== 11000) {
                        console.log(err.message);
                        res.send("ERROR - Inserting in the database");
                    }else if (err && err.code === 11000){
                        console.log(err.message);
                        res.send("ERROR - Inserting in the database DUPLICATE KEY");
                    }else {
                        httpTOOL.verifySingleSiteStatus(site);
                        // console.log('POST creating new site: ' + site);
                        res.send('SUCCESS - created new site : ' + site.name);
                    }
                });
            }else {
                res.send("ERROR -  EMPTY keyword");
            }
        }else {
            res.send("ERROR - INVALID url or the website is down : " + req.body.url);
        }
    }else{
        res.send("ERROR - EMPTY name");
    }

    // TODO: get the domain expire data before storing

    // var whois_info = whoisTOOL.getWHOISinfo(url);
    // console.log("DEBUG whois info ROUTE: " + whois_info);
});

// REMOVE a site - DELETE
// because angularjs is not sending body on delete http requests,
// source is going back to having a post instead of a delete
//
// router.delete('/remove',function(req, res, next) {
//
router.post('/remove',function(req, res, next) {

    var searchName = req.body.name;
    var searchName1 = req.params.name;
    console.log("DEBUG sites route delete : "+ searchName);
    console.log("DEBUG sites route delete 1: "+ searchName1);
    mongoose.model('Site').remove(
        {name: searchName},
        function (err, msg) {
            if (err) {
                console.error(err.message);
            } else {
                res.send('nodejs SUCCESS - removed sucessfully :' + searchName);
            }
        }
    );
});

// EDIT a site - UPDATE
router.put('/edit', function(req, res, next) {

    var searchname = req.body.name;
    var new_url = req.body.url;
    var new_keyword = req.body.keyword;

    mongoose.model('Site').findOneAndUpdate(
        { name: searchname },
        { url: new_url, keyword: new_keyword },
        function (err, site) {
            if (err) {
                console.error(err.message);
            } else {
                res.send("SUCCESS - update sucessfull record : " + site.name);
            }
        }
    );

    // httpTOOL.verifySiteStatus();
    // console.log("DEBUG then OK runned");

});

module.exports = router;
