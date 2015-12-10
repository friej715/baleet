var express = require('express');
var app = express();
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var Twitter = require('twitter');
var keys = require("./keys.js");
var fs = require("fs");

var client = new Twitter(keys);

app.use('/', express.static('public'));

app.post('/delete/:id', function (req, res) {
	client.post('statuses/destroy/' + req.params.id, function (error, tweet, response) {
		if (error) throw new Error(JSON.stringify(error));
		res.json(response)
	})
})

app.get('/files', function(req, res) {
	fs.readdir(__dirname +"/public/tweets", function(err, data) {
		if (err) throw err;
		res.json(data)
	})

})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});