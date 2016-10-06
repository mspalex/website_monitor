
var mongoose = require('mongoose'), //mongo connection
    request = require('request');

//TODO: change the function to accept a site and also that is able to iterate over the collection
// in order to be used upon site creation and
// to be called by a function that traverses all
// so that two uses can be applied to the same feature
// exports.verifySingleSiteStatus = function (site){
//     mongoose.model('Site').find({}, function (err, sites) {
// }

exports.verifyAllSitesStatus = function (){

    // GET ALL THE SITES
    mongoose.model('Site').find({}, function (err, sites) {
        if (err) {
            console.error(err);
        } else {
            if(sites.length > 0){

                // ITERATE OVER EACH ONE
                for (var i = 0; i < sites.length; i++) {

                    var reqSITE = sites[i];

                    // NODEJS REQUEST MODULE NEEDS HTTP:// PREPENDED TO EACH URL
                    var reqURL = reqSITE.url;

                    if(reqURL.indexOf('http://') == -1){
                        reqURL = "http://" + reqURL;
                    }

                    // MAKE A GET REQUEST TO THE SITE
                    request( reqURL, function (error, res, body) {

                        // TODO: get the status code when not found server not to break the program
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
                                if (err) console.error("ERROR UPDATING HTTP STATUS OF: " + err);
                                // else console.log("update sucessfull of : " + site.name);
                            }
                        );

                    });
                }
            }

        }
    });
}
