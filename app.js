var express = require('express');
var app = express();
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var Twitter = require('twitter');
var keys = require("./keys.js")

var client = new Twitter(keys);

console.log(keys)

app.use('/', express.static('public'));

app.post('/delete/:id', function (req, res) {
	var string = "statuses/destroy/" + req.params.id;
	client.post(string, function (error, tweet, response) {
		if (error) throw error;
		console.log(tweet);
		console.log(response);
	})
})


app.get('/tweets', function (req, res) {
	//end_parsed will be emitted once parsing finished 
	converter.on("end_parsed", function (jsonArray) {
	   console.log(jsonArray); //here is your result jsonarray
	   res.json(jsonArray); 
	});
		 
	//read from file 
	require("fs").createReadStream("./tweets.csv").pipe(converter);

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});