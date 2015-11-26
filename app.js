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
	client.post('statuses/destroy/' + req.params.id, function (error, tweet, response) {
		if (error) throw new Error(JSON.stringify(error));
		console.log(tweet);
		console.log(response);
	})
})


app.get('/tweets', function (req, res) {
	var params = {
		screen_name: "jfriedhoff",
		count: 3,
	}

	if (req.query.max_id) {
		params["max_id"] = req.query.max_id
	}


	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) throw new Error(JSON.stringify(error))
		res.json(tweets)
	})


});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});