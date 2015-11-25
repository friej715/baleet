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

		$.post("http://localhost:3000/delete/669362698379988992", function(data) {
			console.log(data)
		})

		return (
			<div>{tweetText}</div>
		)
	}

})

ReactDOM.render(
	<Page/>, document.getElementById("main")
)