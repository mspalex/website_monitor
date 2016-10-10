
var mongoose = require('mongoose'), //mongo connection
    request = require('request'),
    validator = require('validator'); //https://www.npmjs.com/package/valid-url

/*
    exported functions to be used in the ROUTES
*/
module.exports = {
    verifyAllSitesStatus: function (){
        mongoose.model('Site').find({}, function (err, sites) {
            if (err) {
                console.error(err);
            } else {
                if(sites.length > 0){
                    for (var i = 0; i < sites.length; i++) {
                        verifySite(sites[i]);
                    }
                }
            }
        });
    },
    verifySingleSiteStatus: function (site){ // receives the Site Schema object
        verifySite(site);
    }
}

/*
    local function that receives a Site Schema object
    and executes the HTTP STATUS CODE update
    and KEYWORD search and update
*/
function verifySite(site){

    var reqSITE = site;
    var reqURL = reqSITE.url;

    // NODEJS REQUEST MODULE NEEDS HTTP:// PREPENDED TO EACH URL
    if(reqURL.indexOf('http://') == -1){
        reqURL = "http://" + reqURL;
    }

    // MAKE A GET REQUEST TO THE SITE
    request( reqURL, function (error, res, body) {

        if(!error && res !== null){
            // console.log("DEBUG verifySite response: " + res.statusCode + ":" + reqURL);

            var status_temp = res.statusCode;
            var kword_temp = false;

            // SEARCH THE BODY FOR THE KEYWORD
            // TODO: replace the indexof with regex search
            if (!error && res.statusCode == 200) {
                if(body.indexOf(reqSITE.keyword) !== -1){
                    kword_temp = true;
                }
            }

            // UPDATE THE record
            mongoose.model('Site').findOneAndUpdate(
                { name: reqSITE.name },
                { $set: { cur_http_status: status_temp, keyword_exists: kword_temp} }, function (err, site) {
                    if (err) console.error("ERROR - updating database record : " + err.message);
                    // else console.log("update sucessfull of : " + site.name);
                }
            );
        }else {
            console.log("\n1111111111111111111111111111\nDEBUG\n\n"+error.stack+"\n111111111111111111111111111111111111111111");
        }
    });
};
