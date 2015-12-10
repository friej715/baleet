![baleeted](https://i.ytimg.com/vi/7rrZ-sA4FQc/maxresdefault.jpg)

# What's Baleet?

Baleet is a tool that allows you to peruse your entire Twitter archive and delete any unwanted tweets in a quick, easy, and low-friction manner.

I find the web interface for the Twitter archive to be really clunky for doing this sort of thing, so I decided to build a tool that let me do it much faster.

# Status

Beta. ***I don't recommend using this tool yet until I've gotten other folks to give it a code review.***

# How do you use it?

See the Status section for my caveat. Again, I don't recommend using this until I bump its status up to alpha. These instructions are primarily for people who have experience with this and want to help me code review.

Baleet is a NodeJS and ReactJS application. It runs on your own machine: unlike a lot of other tweet delete apps, there's no authentication required, and I never touch any of your private information.

You need two things before you can use Baleet:
* ***API keys.*** An API key is just a code that a piece of code can use to identify that that code is, in fact, authenticated by you. To get a Twitter API key, you have to create a new application [here](https://apps.twitter.com/), and generate an access token. In the Baleet folder, create a file called `keys.js`. This is where your keys go, and that file will look something like this:

```
module.exports = {
	consumer_key: 'dont',
	consumer_secret: 'steal',
	access_token_key: 'my',
	access_token_secret: 'keys'
}
```

* ***Your Twitter archive.*** [Here's](https://support.twitter.com/articles/20170160?lang=en) how you get your Twitter archive. The files you want are in `/data/js/tweets`. Create a folder in `baleet/public` called `tweets` (this is a silly place for it and i'm going to change this soon!!!!) and put your tweets in there. We'll have to modify them a tiny bit more, but we'll do that in a second.

Okay, now you have all the external stuff you need. Here's how to set it up.

* Install [NodeJS](https://nodejs.org/en/download/).
* Download Baleet.
* Open up your command line (Terminal if you're on a Mac).
* Change to the Baleet directory. (You can do this by typing `cd` and then dragging in the Baleet folder.)
* Type `npm install` to install all of Baleet's dependencies.
* In a new Terminal window, navigate to your `baleet/public/tweets` folder.
* Put the following command into Terminal and hit enter: `for i in $(ls *.js); do sed -i.js '1d' $i; done` - this removes the first line of each tweet file, which is extraneous in our case.
* Delete any files in the directory that have a `.js.js` extension. Leave the ones that are just `.js`.
* In the first Terminal window (the one that is in the `baleet/` directory), type `node app.js` and hit enter.
* Go to `http://localhost:3000`.
* Baleet some tweets! When you finish a month, don't forget to delete its file from your `baleet/public/tweets` folder.


# FAQ

* When will it not look like garbage?
	* When you submit a pull request with better CSS.