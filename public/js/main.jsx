var Page = React.createClass({
	getInitialState: function() {
		return {
			tweets: [],
		}
	},

	componentDidMount: function() {
		this.loadTweets();
	},

	loadTweets: function() {
		var con = this;
		$.get("http://localhost:3000/files", function(files) {
			if ($.inArray(".DS_Store", files) > -1) {
				var index = $.inArray(".DS_Store", files)
				console.log(index)
				files.splice(index, 1);
			}
		}).done(function(files) {
			var curFile = files[0];
			console.log(curFile)
			$.get("http://localhost:3000/tweets/" + curFile, function(data) {
				var d = JSON.parse(data);
				con.setState({tweets: d})
			})
		});
	},

	handleDelete: function(id) {
		var newTweets = cloneObject(this.state.tweets);
		this.state.tweets.forEach(function(val, index) {
			if (val["id_str"] == id) {
				newTweets.splice(index, 1);
			}
		})
		this.setState({tweets: cloneObject(newTweets)});
	},

	render: function() {
		var pieces = [];
		var con = this;
		this.state.tweets.forEach(function(val) {
			pieces.push(<Row id={val.id_str} handleDelete={con.handleDelete} text={val.text}></Row>)
		})

		return (
			<div>
				{pieces}
			</div>
		)
	},
});

var Row = React.createClass({
	handleDelete: function(id) {
		this.props.handleDelete(id);
	},

	render: function() {
		return (
			<div id={this.props.id} style={{"margin-bottom":"20px"}}>
				<Tweet text={this.props.text}/>
				<Delete handleDelete={this.handleDelete} id={this.props.id}/>
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
		var con = this;
		console.log(con.props)
		$.ajax({
			url: "http://localhost:3000/delete/" + this.props.id,
			type: "POST",
			success: function() {
				con.props.handleDelete(con.props.id)
			}
		});
	},

	render: function() {
		return (
			<div>
				<button onClick={this.handleDelete}>Delete</button>
			</div>
		)
	}

})


// sssshhhhhh
function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}


ReactDOM.render(
	<Page/>, document.getElementById("main")
)