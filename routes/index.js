var express = require('express');
var router = express.Router();
var util = require('util');
var geoip = require('geoip');
var city = new geoip.City('data/GeoLiteCity.dat');
var asn = new geoip.Org('data/GeoIPASNum.dat');
var browserdetect = 

/* GET home page. */
router.get('/', function(req, res) {
	var asnobj = asn.lookupSync(req.connection.remoteAddress);
	var r = require('ua-parser').parse(req.headers['user-agent']);

	console.log(asnobj);
	res.render('index',
  { title: 'Express',
	ip: req.connection.remoteAddress, org: asnobj, browser:r.ua.toString(), os:r.os.toString()});
});

// dagn

router.get('/ip',function(req, res) {
	res.send(req.connection.remoteAddress);
});

router.get('/portout.js',function(req,res) {
	res.render('portoutjs',
						 { hostname: "localhost", from: 1024, to: 1088 })});

router.get('/portout.json',function (req,res) {
  res.header("Access-Control-Allow-Origin", "*");
	res.send(req.headers);
});

router.get('/req',function(req, res) {
	res.send("<pre>" + util.inspect(req, false, null) + "</pre>");
});

router.get('/res',function(req, res) {
	res.send("<pre>" + util.inspect(res, false, null) +  "</pre>");
});



module.exports = router;
