var Page = React.createClass({
	getInitialState: function() {
		return {
			tweets: [],
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
		var pieces = [];

		this.state.tweets.forEach(function(val) {
			pieces.push(<Row id={val.id} text={val.text}></Row>)
		})

		return (
			<div>
				{pieces}
				<Delete/>
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
});

var Row = React.createClass({
	componentDidMount: function() {
		var elem = ReactDOM.findDOMNode(this);
		$elem = $("#" + elem.id + " input").prop("checked", true);
	},

	render: function() {
		return (
			<div id={this.props.id} style={{"margin-bottom":"20px"}}>
				<input style={{float:"left"}} type="checkbox" value={this.props.id}/>
				<Tweet text={this.props.text}/>
			</div>
		)
	}
});

var Tweet = React.createClass({
	render: function() {
		return (
			<div style={{width:"90%"}}>{this.props.text}</div>
		)
	}
});

var Delete = React.createClass({
	handleClick: function() {
		var toDelete = []
		$(":checked").each(function() {
			toDelete.push($(this).val());
		});

		// next step: post this to delete endpoint
		// altho, before we delete, we need to note the last tweet so we can get the next page
		console.log(toDelete)

	},


	render: function() {
		return (
			<div>
				<button onClick={this.handleClick}>Delete All Checked</button>
			</div>
		)
	}

})

ReactDOM.render(
	<Page/>, document.getElementById("main")
)