
// mongoose
var mongoose = require('mongoose'), //mongo connection
    whoisparser = require('parse-whois'),
    whois = require('node-whois');
    // Parser = require("simple-text-parser");

exports.getWHOISinfo = function (url){

    console.log("IN whois info");

    // var url = "";
    // mongoose.model('Site').find({name: sitename}, function (err, site) {
    //     if (err) {
    //         return "Mongoose error getWHOISinfo :" + console.error(err);
    //     } else {
    //         url = site.url;
    //     }
    // });
    console.log("this is shit: " + url);

// };
    if(url !== null){
        console.log("not shit anymore");

        var options = {
            "server":  url+":80",   // this can be a string ("host:port") or an object with host and port as its keys; leaving it empty makes lookup rely on servers.json
            "follow":  2,    // number of times to follow redirects
            "timeout": 0,    // socket timeout, excluding this doesn't override any default timeout value
            "verbose": false // setting this to true returns an array of responses from all servers
        }

        console.log("OPTIONS: " + options);

        whois.lookup(url, options, function(err, data) {
            if (err) {
                return "whois lookup error :" + console.error(err);
            } else {
                // console.log("not shit anymore 3");
                // var info = whoisparser.parseWhoIsData(data);
                // var date = "";
                // console.log("DEBUG INFO SIZE: " + info.length);
                // for(var i = 0; i < info.length; i++){
                //     console.log("!!!" + info[i][0]);
                //     if(info[i].attribute.indexOf('Expiration') !== -1){
                //         date = info[i].value;
                //         break;
                //     }
                // }
                // return date;
                console.log(data);
                console.log(whoisparser.parseWhoIsData(data));
            }
        });
    }else{
        console.log("not shit anymore 4");
        return "no URL found on database";
    }
};
    // string_parser = new Parser();
    //
    // will match only each expiration date line on whois response
    // string_parser.addRule(/^.*Expiration\sDate.*/gm,function(tag){
        // return tag;
    // });

    // parser.addRule(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}|[0-9]{2}\/[0-9]{2}\/[0-9]{4}|[0-9]{4}\/[0-9]{2}\/[0-9]{2}/gm, function(tag) {
    //     console.log("DEBUG? "+tag);
    //     return tag;
    // });
    // var options = {
    //     "server":  "",   // this can be a string ("host:port") or an object with host and port as its keys; leaving it empty makes lookup rely on servers.json
    //     "follow":  2,    // number of times to follow redirects
    //     "timeout": 0,    // socket timeout, excluding this doesn't override any default timeout value
    //     "verbose": false // setting this to true returns an array of responses from all servers
    // }

    // sites_list.forEach(function(site){
    //     options["server"] = site + ":80";
    //     console.log(options);
    //     whois.lookup(site, options, function(err, data) {
    //         console.log("SITE: "+site);
    //         printwhoislookup(options["server"], parser.parseWhoIsData(data));
    //         // printwhoislookup(site, parser.render(data));
    //         // printwhoislookup(site,data);
    //     });
    //
    // });
// };

// function printwhoislookup(site, obj){
//     // var expire_date = "";
//     for(var i = 0; i < obj.length; i++){
//         // console.log(string_parser.render(obj[i].attribute));
//         // if(  !== null ){
//         if(obj[i].attribute.indexOf('Expiration') !== -1){
//             console.log(site+" : ");
//             console.log(obj[i]);
//         }
//         // if (obj[i].attribute.indexOf('Expiration') != -1){
//         //     expire_date = obj[i].value;
//         //     break;
//         // }
//     }
//     // console.log(site+" : "+expire_date);
//     // obj.forEach(function(object){
//     //     console.log(object.attribute);
//     // });
//     // console.log(site+": "+obj);
// };
