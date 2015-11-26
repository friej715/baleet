var Page = React.createClass({
	getInitialState: function() {
		return {
			tweets: [],
		}
	},

	getCookie: function() {
		var cookie = document.cookie;
		var m_id;
		if (cookie.indexOf("max_id") > -1) {
			console.log(m_id)
			m_id = cookie.split("max_id=")[1];
			return m_id;
		} 
		return ""
	},

	componentDidMount: function() {
		this.loadTweets();
	},

	loadTweets: function() {
		var querystring = "";
		var c = this.getCookie();
		if (c != "") {
			querystring = "?max_id=" + c
		}
		console.log(c)

		$.get("http://localhost:3000/tweets" + querystring, function(data) {
			var d = data;
			console.log(data)
			console.log('got data')
			if (this.isMounted()) {
				this.setState({tweets: d})
			}
		}.bind(this))
	},

	getNextSet: function(toDelete) {
		console.log(toDelete)


		document.cookie="max_id=" + this.state.tweets[this.state.tweets.length-1].id_str
		this.loadTweets();
	},

	render: function() {
		var pieces = [];
		this.state.tweets.forEach(function(val) {
			pieces.push(<Row id={val.id_str} text={val.text}></Row>)
		})

		return (
			<div>
				{pieces}
				<Delete getNextSet={this.getNextSet}/>
			</div>
		)
	},
});

var Row = React.createClass({
	componentDidMount: function() {
		var elem = ReactDOM.findDOMNode(this);
		$elem = $("#" + elem.id + " input").prop("checked", false);
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

	handleDelete: function(toDelete) {

		toDelete.forEach(function(value) {
			$.ajax({
				url: "http://localhost:3000/delete/" + value,
				type: "POST",
			});
		});

	},

	handleClick: function() {
		var toDelete = []
		$(":checked").each(function() {
			toDelete.push($(this).val());
		});

		this.handleDelete(toDelete);
		$("input").prop("checked", false);
		document.body.scrollTop = document.documentElement.scrollTop = 0;

		// next step: post this to delete endpoint
		// altho, before we delete, we need to note the last tweet so we can get the next page
		// console.log(toDelete)
		this.props.getNextSet(toDelete[toDelete.length-1])
	},



	render: function() {
		console.log(this.props)
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