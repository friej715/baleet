var Page = React.createClass({
	getInitialState: function() {
		return {
			tweets: {},
			index: 0
		}
	},

	componentDidMount: function() {
		$.get("http://localhost:3000/tweets", function(data) {
			var d = data;
			if (this.isMounted()) {
				console.log(data)
				this.setState({tweets: d})
			}
		}.bind(this))
	},

	render: function() {
		var tweet = this.state.tweets[this.state.index];
		var tweetText;
		if (tweet != undefined) {
			tweetText = tweet.text;
		}

		return (
			<div>
				<div>{tweetText}</div>
				
				<div>
					<button onClick={this.getNextTweet}>keep</button>
					<button onClick={this.deleteTweet}>baleet</button>
				</div>
			</div>
		)
	},

	getNextTweet: function() {
				console.log(this.state.index)
		console.log(this.state.tweets[this.state.index])
		var lastIndex = this.state.index;	
		this.setState({index: lastIndex + 1})
	},

	deleteTweet: function() {
		console.log(this.state.index)
		console.log(this.state.tweets[this.state.index])
		console.log(this.state.tweets[this.state.index].tweet_id)
		$.post("http://localhost:3000/delete/" + this.state.tweets[this.state.index].tweet_id, function(data) {
			this.getNextTweet()
		}.bind(this))
	}
})

ReactDOM.render(
	<Page/>, document.getElementById("main")
)