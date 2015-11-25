![baleeted](https://i.ytimg.com/vi/7rrZ-sA4FQc/maxresdefault.jpg)

# what

imo it's really annoying that twitter doesn't give you a better interface for deleting your tweets than the web archive. i always lose my place and get frustrated with it. so i am making my own.

# status

v0.1 and not a god damned float more.

# how to

first of all, i highly recommend not messing with this app until i remove this "i highly recommend not messing with this app" message. i do not vouch for literally any part of it yet. i am keeping any beginner instructions out of this readme specifically because no one who is not ready to break shit should touch it. (don't worry beginner friends, when it is more stable i will Have Your Back and document the shit out of it.)

but here is how it works.

baleet is a nodejs and react application. it runs on your own machine. no oauth, i never touch any of your private info. it runs on port 3000. i don't encrypt anything at any point.

baleet uses cookies to try to bookmark where you left off. that's the `max_id` cookie--it's used to serve up the next chunk of tweets. this means that, if you (or the app) accidentally messes up and you want to go back, you should be able to change the value of this cookie to the most recent tweet you want to allow. cookie nonsense is behaving the weirdest rn so if you want to help fix that, be my guest!

there are three key parts of baleet:

* `keys.js` - this file doesn't exist in this repo because i'm an idiot who always manages to post my api keys to github. because i am an idiot you get to make it yourself, so make it in the root directory of baleet. this is where you put your api keys. it'll look something like: 

```
module.exports = {
	consumer_key: 'dont',
	consumer_secret: 'steal',
	access_token_key: 'my',
	access_token_secret: 'keys'
}
```

* `app.js` - this handles all the actual posting to twitter and such. the lines you care about are:

```
var params = {
	screen_name: "jfriedhoff",
	count: 200,
}
```

obviously you'll want to replace screen_name with your own. you can change the count too if you like.

* `main.jsx` - you don't have to worry about too much here, the only setting you might care about is in this chunk:

```
componentDidMount: function() {
	var elem = ReactDOM.findDOMNode(this);
	$elem = $("#" + elem.id + " input").prop("checked", true);
},
```

see the `true` at the end of that line? that means that baleet assumes you want to delete most of your shit--all the boxes will be checked by default. this is my misanthropic default. you can change that to `false` if you want to cherry pick a little more.

i think that's it? let's set our twitter archives on fire is basically what i am saying.