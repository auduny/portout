var express = require('express');
var router = express.Router();
var util = require('util');
var geoip = require('geoip');
var city = new geoip.City('data/GeoLiteCity.dat');
var asn = new geoip.Org('data/GeoIPASNum.dat');
var uaparser = require('ua-parser');

/* GET home page. */
router.get('/', function (req, res) {
    //var asnobj = asn.lookupSync(req.connection.remoteAddress);
    //	var asnobj = asn.lookupSync("8.8.8.8");
    var r = uaparser.parse(req.headers['user-agent']);

    res.render('index', {
        title: 'Express',
        ip: req.connection.remoteAddress,
        org: "foobar",
        ptr: "fjasebengel",
        whois: "whois",
        useragent: req.headers['user-agent'],
        browser: r.ua.version,
        os: "fasker"
    });
});

router.get('/ip', function (req, res) {
    if (req.param('type') == "json") {
        res.json({ip: req.connection.remoteAddress});
    } else {
        res.send(req.connection.remoteAddress);
    }
});

router.get('/ua', function (req, res) {
    if (req.param('type') == "json") {
        var r = require('ua-parser').parse(req.headers['user-agent']);
        res.json(r);
    } else {
        res.send(req.connection.remoteAddress);
    }
});


router.get('/asn', function (req, res) {
    var asnobj = asn.lookupSync(req.connection.remoteAddress);
    if (asnobj) {
        res.json(asnobj);
    } else {
        res.send("instafailure");
    }
});

router.get('/geoip', function (req, res) {
    var cityobj = city.lookupSync(req.connection.remoteAddress);
    if (cityobj) {
        res.json(cityobj);
    } else {
        res.send("instafailure");
    }
});


router.get('/portout.js', function (req, res) {
    res.render('portoutjs',
        {hostname: "localhost", from: 1024, to: 1088});
});

router.get('/portout.json', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(req.headers);
});

router.get('/req', function (req, res) {
    res.send("<pre>" + util.inspect(req, false, null) + "</pre>");
});

router.get('/res', function (req, res) {
    res.send("<pre>" + util.inspect(res, false, null) + "</pre>");
});


module.exports = router;
